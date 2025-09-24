import pool from "../config/db.js";

export const ColorModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM colors ORDER BY name ASC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM colors WHERE color_id = $1", [id]);
    return res.rows[0] || null;
  },

  async create({ name, hex_code }) {
    const res = await pool.query("INSERT INTO colors (name, hex_code) VALUES ($1, $2) RETURNING *", [name, hex_code]);
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key of ["name", "hex_code"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    const q = `UPDATE colors SET ${fields.join(", ")}, updated_at = now() WHERE color_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM colors WHERE color_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  },
};
