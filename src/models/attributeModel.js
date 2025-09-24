import pool from "../config/db.js";

export const AttributeModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM attributes ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM attributes WHERE attribute_id = $1", [id]);
    return res.rows[0];
  },

  async create({ code,name }) {
    const res = await pool.query(
      "INSERT INTO attributes (code, name) VALUES ($1,$2) RETURNING *",
      [code,name]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["code", "name"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE attributes SET ${fields.join(", ")}, updated_at = now() WHERE attribute_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM attributes WHERE attribute_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
