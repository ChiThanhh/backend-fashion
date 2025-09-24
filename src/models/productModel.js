import pool from "../config/db.js";

export const ProductModel = {
    async findAll() {
        const res = await pool.query(
            `SELECT p.*,
                    c.name AS category_name,
                    b.name AS brand_name,
                    COALESCE(img.image_urls, '{}') AS image_urls,
            img.thumbnail_url,
                    prc.min_price,
                    prc.max_price,
            prc.currency,
            cs.colors,
            cs.sizes
             FROM products p
             LEFT JOIN categories c ON p.category_id = c.category_id
             LEFT JOIN brands b ON p.brand_id = b.brand_id
             LEFT JOIN LATERAL (
                SELECT 
                    array_agg(pi.url ORDER BY pi.sort_order) AS image_urls,
                    (array_agg(pi.url ORDER BY pi.sort_order))[1] AS thumbnail_url
                FROM product_images pi
                WHERE pi.product_id = p.product_id
             ) img ON true
             LEFT JOIN LATERAL (
                SELECT 
                    MIN(pz.list_amount) AS min_price,
                    MAX(pz.list_amount) AS max_price,
                    MIN(pz.currency)   AS currency
                FROM product_variants v
                JOIN prices pz ON pz.variant_id = v.variant_id
                WHERE v.product_id = p.product_id
             ) prc ON true
                                     LEFT JOIN LATERAL (
                                SELECT 
                                                COALESCE((
                                                    SELECT json_agg(json_build_object('id', dc.color_id, 'name', dc.name, 'sort_order', NULL) ORDER BY dc.name)
                                        FROM (
                                            SELECT DISTINCT c.color_id, c.name
                                            FROM product_variants v
                                            JOIN LATERAL jsonb_array_elements_text(v.color_id) cid(val) ON true
                                            JOIN colors c ON c.color_id = cid.val::uuid
                                            WHERE v.product_id = p.product_id
                                        ) dc
                                    ), '[]') AS colors,
                                    COALESCE((
                                                    SELECT json_agg(json_build_object('id', ds.size_id, 'name', ds.name, 'sort_order', ds.sort_order) ORDER BY ds.sort_order, ds.name)
                                        FROM (
                                                        SELECT DISTINCT s.size_id, s.name, s.sort_order
                                            FROM product_variants v
                                            JOIN LATERAL jsonb_array_elements_text(v.size_id) sid(val) ON true
                                            JOIN sizes s ON s.size_id = sid.val::uuid
                                            WHERE v.product_id = p.product_id
                                        ) ds
                                    ), '[]') AS sizes
                         ) cs ON true
             ORDER BY p.created_at DESC`
        )
        return res.rows;
    },
    async findById(id) {
        const res = await pool.query(
            `SELECT p.*,
                    c.name AS category_name,
                    b.name AS brand_name,
                    COALESCE(img.image_urls, '{}') AS image_urls,
            img.thumbnail_url,
                    prc.min_price,
                    prc.max_price,
            prc.currency,
            cs.colors,
            cs.sizes
             FROM products p
             LEFT JOIN categories c ON p.category_id = c.category_id
             LEFT JOIN brands b ON p.brand_id = b.brand_id
             LEFT JOIN LATERAL (
                SELECT 
                    array_agg(pi.url ORDER BY pi.sort_order) AS image_urls,
                    (array_agg(pi.url ORDER BY pi.sort_order))[1] AS thumbnail_url
                FROM product_images pi
                WHERE pi.product_id = p.product_id
             ) img ON true
             LEFT JOIN LATERAL (
                SELECT 
                    MIN(pz.list_amount) AS min_price,
                    MAX(pz.list_amount) AS max_price,
                    MIN(pz.currency)   AS currency
                FROM product_variants v
                JOIN prices pz ON pz.variant_id = v.variant_id
                WHERE v.product_id = p.product_id
             ) prc ON true
                                     LEFT JOIN LATERAL (
                                SELECT 
                                                COALESCE((
                                                    SELECT json_agg(json_build_object('id', dc.color_id, 'name', dc.name, 'sort_order', NULL) ORDER BY dc.name)
                                        FROM (
                                            SELECT DISTINCT c.color_id, c.name
                                            FROM product_variants v
                                            JOIN LATERAL jsonb_array_elements_text(v.color_id) cid(val) ON true
                                            JOIN colors c ON c.color_id = cid.val::uuid
                                            WHERE v.product_id = p.product_id
                                        ) dc
                                    ), '[]') AS colors,
                                    COALESCE((
                                                    SELECT json_agg(json_build_object('id', ds.size_id, 'name', ds.name, 'sort_order', ds.sort_order) ORDER BY ds.sort_order, ds.name)
                                        FROM (
                                                        SELECT DISTINCT s.size_id, s.name, s.sort_order
                                            FROM product_variants v
                                            JOIN LATERAL jsonb_array_elements_text(v.size_id) sid(val) ON true
                                            JOIN sizes s ON s.size_id = sid.val::uuid
                                            WHERE v.product_id = p.product_id
                                        ) ds
                                    ), '[]') AS sizes
                         ) cs ON true
             WHERE p.product_id = $1`,
            [id]
        );
        return res.rows[0];
    },
    async create({ brand_id, category_id, name, slug, description, gender, material, fit, care_instructions }) {
        // đảm bảo description là object, nếu không thì ép về {}
        const desc = description ? JSON.stringify(description) : JSON.stringify({});
        const res = await pool.query(
            `INSERT INTO products (
            brand_id, category_id, name, slug, description, gender, material, fit, care_instructions
        ) VALUES ($1, $2, $3, $4, $5::jsonb, $6, $7, $8, $9) RETURNING *`,
            [brand_id, category_id, name, slug, desc, gender, material, fit, care_instructions]
        );
        return res.rows[0];
    },

    async update(id, patch) {
        const fields = [];
        const values = [];
        let idx = 1;

        for (const key of [
            "brand_id",
            "category_id",
            "name",
            "slug",
            "description",
            "gender",
            "material",
            "fit",
            "care_instructions",
            "status"
        ]) {
            if (patch[key] !== undefined) {
                if (key === "description") {
                    fields.push(`${key} = $${idx}::jsonb`);
                    values.push(JSON.stringify(patch[key])); // ép về JSON
                } else {
                    fields.push(`${key} = $${idx}`);
                    values.push(patch[key]);
                }
                idx++;
            }
        }

        if (fields.length === 0) return this.findById(id);

        values.push(id);

        const q = `UPDATE products 
               SET ${fields.join(", ")}, updated_at = now() 
               WHERE product_id = $${idx} 
               RETURNING *`;
        const res = await pool.query(q, values);
        return res.rows[0];
    },

    async delete(id) {
        const res = await pool.query("DELETE FROM products WHERE product_id = $1 RETURNING *", [id]);
        return res.rows[0];
    }
}