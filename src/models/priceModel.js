import pool from "../config/db.js";

const priceSelectQuery = `
  SELECT pz.*,
         v.sku AS variant_sku,
         v.barcode AS variant_barcode,
         pr.name AS product_name
  FROM prices pz
  JOIN product_variants v ON pz.variant_id = v.variant_id
  JOIN products pr ON v.product_id = pr.product_id
`;

export const PriceModel = {
  async findAll() {
    const res = await pool.query(`${priceSelectQuery} ORDER BY pz.created_at DESC`);
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query(`${priceSelectQuery} WHERE pz.price_id = $1`, [id]);
    return res.rows[0];
  },

  async create({ variant_id, currency, list_amount }) {
    const res = await pool.query(
      `INSERT INTO prices (variant_id, currency, list_amount)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [variant_id, currency, list_amount]
    );
    return this.findById(res.rows[0].price_id); // gọi lại để lấy kèm join
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["currency", "list_amount"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE prices SET ${fields.join(", ")}, updated_at = now() WHERE price_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return this.findById(res.rows[0].price_id); // lấy lại có join
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM prices WHERE price_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};

// Find price by product and variant attributes (color, size)
export async function findByProductColorSize({ product_id, color_id, size_id }) {
  // Accept either UUID or null for color/size; when null, match variants with empty array
  const res = await pool.query(
    `SELECT pz.*
     FROM product_variants v
     JOIN prices pz ON pz.variant_id = v.variant_id
     WHERE v.product_id = $1
       AND (
            $2::uuid IS NULL
            OR EXISTS (
                 SELECT 1 FROM jsonb_array_elements_text(v.color_id) cid(val)
                 WHERE cid.val::uuid = $2::uuid
            )
       )
       AND (
            $3::uuid IS NULL
            OR EXISTS (
                 SELECT 1 FROM jsonb_array_elements_text(v.size_id) sid(val)
                 WHERE sid.val::uuid = $3::uuid
            )
       )
     ORDER BY pz.price_id ASC
     LIMIT 1`,
    [product_id, color_id ?? null, size_id ?? null]
  );
  return res.rows[0] || null;
}
