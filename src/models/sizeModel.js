import pool from "../config/db.js";

export const SizeModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM sizes ORDER BY sort_order ASC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM sizes WHERE size_id = $1", [id]);
    return res.rows[0] || null;
  },

  async create({ name, sort_order }) {
    const res = await pool.query("INSERT INTO sizes (name, sort_order) VALUES ($1, $2) RETURNING *", [
      name,
      sort_order || 0,
    ]);
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key of ["name", "sort_order"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    const q = `UPDATE sizes SET ${fields.join(", ")}, updated_at = now() WHERE size_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM sizes WHERE size_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  },
};
