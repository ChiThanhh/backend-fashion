import pool from "../config/db.js";

export const ImageModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM product_images ORDER BY sort_order ASC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM product_images WHERE image_id = $1", [id]);
    return res.rows[0];
  },

  async create({ product_id, url, alt, sort_order }) {
    const res = await pool.query(
      `INSERT INTO product_images (product_id, url, alt, sort_order)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [product_id, url, alt, sort_order]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["url", "alt", "sort_order"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE product_images SET ${fields.join(", ")}, updated_at = now() WHERE image_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM product_images WHERE image_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
