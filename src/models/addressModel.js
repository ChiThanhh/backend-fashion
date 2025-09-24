// src/models/addressModel.js
import pool from "../config/db.js";

export const AddressModel = {
  async listByUser(userId) {
    const res = await pool.query("SELECT * FROM addresses WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
    return res.rows;
  },

  async create(userId, payload) {
    const q = `INSERT INTO addresses (user_id, label, full_name, phone, line1, line2, ward, district, city, province, country_code, postal_code, is_default)
               VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`;
    const values = [
      userId,
      payload.label,
      payload.full_name,
      payload.phone,
      payload.line1,
      payload.line2,
      payload.ward,
      payload.district,
      payload.city,
      payload.province,
      payload.country_code || "VN",
      payload.postal_code,
      payload.is_default || false,
    ];
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async update(addressId, userId, patch) {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key of ["label","full_name","phone","line1","line2","ward","district","city","province","country_code","postal_code","is_default"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }
    if (fields.length === 0) return null;
    values.push(addressId);
    values.push(userId);
    const q = `UPDATE addresses SET ${fields.join(", ")}, updated_at = now() WHERE address_id = $${idx} AND user_id = $${idx+1} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async remove(addressId, userId) {
    const q = `DELETE FROM addresses WHERE address_id = $1 AND user_id = $2 RETURNING *`;
    const res = await pool.query(q, [addressId, userId]);
    return res.rows[0];
  },

  async findById(addressId, userId) {
    const q = `SELECT * FROM addresses WHERE address_id = $1 AND user_id = $2`;
    const res = await pool.query(q, [addressId, userId]);
    return res.rows[0];
  }
};
