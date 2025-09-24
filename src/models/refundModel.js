import pool from "../config/db.js";

export const RefundModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM refunds ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM refunds WHERE refund_id = $1", [id]);
    return res.rows[0];
  },

  async findByReturn(returnId) {
    const res = await pool.query("SELECT * FROM refunds WHERE refund_id = (SELECT refund_id FROM returns WHERE return_id = $1)", [returnId]);
    return res.rows[0];
  },

  async create({ payment_id, amount, currency, status, reason, metadata = null }) {
    const res = await pool.query(
      `INSERT INTO refunds (payment_id, amount, currency, status, reason, metadata)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [payment_id, amount, currency, status, reason, metadata]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["status", "reason", "metadata"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE refunds SET ${fields.join(", ")}, updated_at = now() WHERE refund_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM refunds WHERE refund_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
