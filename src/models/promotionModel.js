import pool from "../config/db.js";

export const PromotionModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM promotions ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM promotions WHERE promotion_id = $1", [id]);
    return res.rows[0];
  },

  async create({ name, description, discount_type, discount_value, starts_at, ends_at }) {
    const res = await pool.query(
      "INSERT INTO promotions (name, description, discount_type, discount_value, starts_at, ends_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, description, discount_type, discount_value, starts_at, ends_at]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["name", "description", "discount_type", "discount_value", "starts_at", "ends_at"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }
    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE promotions SET ${fields.join(", ")}, updated_at = now() WHERE promotion_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM promotions WHERE promotion_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
