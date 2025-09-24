import pool from "../config/db.js";

export const PaymentModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM payments ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM payments WHERE payment_id = $1", [id]);
    return res.rows[0];
  },

  async findByOrder(orderId) {
    const res = await pool.query("SELECT * FROM payments WHERE order_id = $1 ORDER BY created_at DESC", [orderId]);
    return res.rows;
  },

  async create({ order_id, provider, status, amount, currency, transaction_ref = null, payload = null }) {
    const res = await pool.query(
      `INSERT INTO payments (order_id, provider, status, amount, currency, transaction_ref, payload)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [order_id, provider, status, amount, currency, transaction_ref, payload]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["provider", "status", "amount", "currency", "transaction_ref", "payload"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE payments SET ${fields.join(", ")}, updated_at = now() WHERE payment_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM payments WHERE payment_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
