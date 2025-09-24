import pool from "../config/db.js";

export const CouponModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM coupons ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM coupons WHERE coupon_id = $1", [id]);
    return res.rows[0];
  },

  async create({ code, discount_type, discount_value, expires_at }) {
    const res = await pool.query(
      "INSERT INTO coupons (code, discount_type, discount_value, expires_at) VALUES ($1, $2, $3, $4) RETURNING *",
      [code, discount_type, discount_value, expires_at]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["code", "discount_type", "discount_value", "expires_at"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }
    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE coupons SET ${fields.join(", ")}, updated_at = now() WHERE coupon_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM coupons WHERE coupon_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
