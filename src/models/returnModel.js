import pool from "../config/db.js";

export const ReturnModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM returns ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM returns WHERE return_id = $1", [id]);
    return res.rows[0];
  },

  async findByOrder(orderId) {
    const res = await pool.query("SELECT * FROM returns WHERE order_id = $1 ORDER BY created_at DESC", [orderId]);
    return res.rows;
  },

  async create({ order_id, status, reason, refund_id = null, metadata = null }) {
    const res = await pool.query(
      `INSERT INTO returns (order_id, status, reason, refund_id, metadata)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [order_id, status, reason, refund_id, metadata]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["status", "reason", "refund_id", "metadata"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE returns SET ${fields.join(", ")}, updated_at = now() WHERE return_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM returns WHERE return_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
