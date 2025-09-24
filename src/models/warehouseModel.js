import pool from "../config/db.js";

export const WarehouseModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM warehouses ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM warehouses WHERE warehouse_id = $1", [id]);
    return res.rows[0];
  },

  async create({ name, code, address }) {
    const res = await pool.query(
      "INSERT INTO warehouses (name, code, address ) VALUES ($1, $2 , $3) RETURNING *",
      [name, code, address ]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["name", "code", "address"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }
    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE warehouses SET ${fields.join(", ")}, updated_at = now() WHERE warehouse_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM warehouses WHERE warehouse_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
