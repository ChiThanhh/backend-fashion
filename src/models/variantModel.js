import pool from "../config/db.js"

const variantSelectQuery = `
    SELECT v.*,
           COALESCE(
               (SELECT json_agg(json_build_object('id', c.color_id, 'name', c.name))
                FROM jsonb_array_elements_text(v.color_id) AS cid
                JOIN colors c ON c.color_id = cid::uuid), '[]'
           ) AS colors,
           COALESCE(
               (SELECT json_agg(json_build_object('id', s.size_id, 'name', s.name))
                FROM jsonb_array_elements_text(v.size_id) AS sid
                JOIN sizes s ON s.size_id = sid::uuid), '[]'
           ) AS sizes,
           COALESCE(
               (SELECT json_agg(json_build_object('id', a.value_id, 'name', a.value))
                FROM jsonb_array_elements_text(v.additional) AS aid
                JOIN attribute_values a ON a.value_id = aid::uuid), '[]'
           ) AS additional_values,
           pz.price_id   AS price_id,
           pz.list_amount AS price,
           pz.currency   AS currency
    FROM product_variants v
    LEFT JOIN prices pz ON pz.variant_id = v.variant_id
`;

export const VariantModel = {
    async findAll() {
        const res = await pool.query(`${variantSelectQuery} ORDER BY v.created_at DESC`);
        return res.rows;
    },

    async findById(id) {
        const res = await pool.query(`${variantSelectQuery} WHERE v.variant_id = $1`, [id]);
        return res.rows[0];
    },

    async findByProductId(productId) {
        const res = await pool.query(
            `${variantSelectQuery} WHERE v.product_id = $1 ORDER BY v.created_at DESC`,
            [productId]
        );
        return res.rows;
    },

    async create({ product_id, sku, barcode, additional, weight_gram, color_id, size_id }) {
        const res = await pool.query(
            `INSERT INTO product_variants 
             (product_id, sku, barcode, additional, weight_gram, color_id, size_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [
                product_id,
                sku,
                barcode,
                JSON.stringify(additional ?? []),
                weight_gram,
                JSON.stringify(color_id ?? []),
                JSON.stringify(size_id ?? [])
            ]
        );
        const variantId = res.rows[0].variant_id;

        const whRes = await pool.query("SELECT warehouse_id FROM warehouses");

        for (const wh of whRes.rows) {
            await pool.query(
                `INSERT INTO inventory (variant_id, warehouse_id, available_qty, reserved_qty)
                VALUES ($1, $2, 0, 0)`,
                [variantId, wh.warehouse_id]
            )
        }
        await pool.query(
            `INSERT INTO prices (variant_id, list_amount, currency) 
            VALUES ($1, $2, 'VND')`,
            [variantId, 0]
        );

        return this.findById(variantId);
    },

    async update(id, patch) {
        const fields = [];
        const values = [];
        let idx = 1;

        for (const key of ["sku", "barcode", "additional", "weight_gram", "status", "color_id", "size_id"]) {
            if (patch[key] !== undefined) {
                let val = patch[key];
                if (["additional", "color_id", "size_id"].includes(key)) {
                    val = JSON.stringify(val ?? []);
                }
                fields.push(`${key} = $${idx}`);
                values.push(val);
                idx++;
            }
        }

        if (fields.length === 0) return this.findById(id);

        values.push(id);
        const q = `UPDATE product_variants 
                   SET ${fields.join(", ")}, updated_at = now() 
                   WHERE variant_id = $${idx} RETURNING *`;
        const res = await pool.query(q, values);
        // gọi lại findById để trả dữ liệu có JOIN
        return this.findById(res.rows[0].variant_id);
    },

    async delete(id) {
        const res = await pool.query("DELETE FROM product_variants WHERE variant_id = $1 RETURNING *", [id]);
        return res.rows[0] || null;
    }
    ,
    //hàm tạo biến thể sản phẩm đồng loạt
    async bulkCreate(product_id, variants) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const created = [];

            for (const v of variants) {
                const { sku, barcode, weight_gram, color_id, size_id, additional } = v;

                const res = await client.query(
                    `INSERT INTO product_variants 
          (product_id, sku, barcode, weight_gram, color_id, size_id, additional)
         VALUES ($1,$2,$3,$4,$5,$6,$7) 
         RETURNING *`,
                    [
                        product_id,
                        sku,
                        barcode ?? null,
                        weight_gram ?? null,
                        color_id ? JSON.stringify([color_id]) : JSON.stringify([]),
                        size_id ? JSON.stringify([size_id]) : JSON.stringify([]),
                        additional ? JSON.stringify(additional) : JSON.stringify([]),
                    ]
                );

                const variant = res.rows[0];
                const variantId = variant.variant_id;

                // tạo inventory cho tất cả warehouse
                const whRes = await client.query("SELECT warehouse_id FROM warehouses");
                for (const wh of whRes.rows) {
                    await client.query(
                        `INSERT INTO inventory (variant_id, warehouse_id, available_qty, reserved_qty)
           VALUES ($1, $2, 0, 0)`,
                        [variantId, wh.warehouse_id]
                    );
                }

                // tạo giá mặc định
                await client.query(
                    `INSERT INTO prices (variant_id, list_amount, currency) 
         VALUES ($1, $2, 'VND')`,
                    [variantId, v.price ?? 0]
                );

                created.push(await VariantModel.findById(variantId));
            }

            await client.query("COMMIT");
            return created;
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    },
    async bulkUpdate(product_id, variants) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const updated = [];

            for (const v of variants) {
                const { variant_id, sku, barcode, weight_gram, color_id, size_id, additional, price, status } = v;

                const res = await client.query(
                    `UPDATE product_variants
         SET 
           sku = $1,
           barcode = $2,
           weight_gram = $3,
           color_id = $4,
           size_id = $5,
           additional = $6,
           status = $7,
           updated_at = NOW()
         WHERE variant_id = $8 AND product_id = $9
         RETURNING *`,
                    [
                        sku,
                        barcode ?? null,
                        weight_gram ?? null,
                        color_id ? JSON.stringify([color_id]) : JSON.stringify([]),
                        size_id ? JSON.stringify([size_id]) : JSON.stringify([]),
                        additional ? JSON.stringify(additional) : JSON.stringify([]),
                        status ?? true,
                        variant_id,
                        product_id,
                    ]
                );

                const variant = res.rows[0];
                const variantId = variant.variant_id;

                // update giá
                await client.query(
                    `UPDATE prices
         SET list_amount = $1
         WHERE variant_id = $2`,
                    [price ?? 0, variantId]
                );

                // push variant mới nhất
                updated.push(await VariantModel.findById(variantId));
            }

            await client.query("COMMIT");
            return updated;
        } catch (err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }




};
