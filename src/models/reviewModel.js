import pool from "../config/db.js";

export const ReviewModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM reviews ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM reviews WHERE review_id = $1", [id]);
    return res.rows[0];
  },

  async create({ product_id, user_id, rating, comment }) {
    const res = await pool.query(
      "INSERT INTO reviews (product_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
      [product_id, user_id, rating, comment || ""]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["rating", "comment"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }
    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE reviews SET ${fields.join(", ")}, updated_at = now() WHERE review_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM reviews WHERE review_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
