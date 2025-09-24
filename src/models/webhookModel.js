import pool from "../config/db.js";

export const WebhookModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM webhooks_outbox ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM webhooks_outbox WHERE webhook_id = $1", [id]);
    return res.rows[0];
  },

  async create({ event_type, payload, status }) {
    const res = await pool.query(
      "INSERT INTO webhooks_outbox (event_type, payload, status) VALUES ($1, $2, $3) RETURNING *",
      [event_type, payload, status || "pending"]
    );
    return res.rows[0];
  },

  async updateStatus(id, status) {
    const res = await pool.query(
      "UPDATE webhooks_outbox SET status = $1, updated_at = now() WHERE webhook_id = $2 RETURNING *",
      [status, id]
    );
    return res.rows[0];
  }
};
