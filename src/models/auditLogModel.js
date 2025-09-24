import pool from "../config/db.js";

export const AuditLogModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM audit_logs ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM audit_logs WHERE log_id = $1", [id]);
    return res.rows[0];
  },

  async create({ user_id, action, details }) {
    const res = await pool.query(
      "INSERT INTO audit_logs (user_id, action, details) VALUES ($1, $2, $3) RETURNING *",
      [user_id, action, details]
    );
    return res.rows[0];
  }
};
