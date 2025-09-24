import pool from "../config/db.js";

export const ShipmentModel = {
  async findAll() {
    const res = await pool.query("SELECT * FROM shipments ORDER BY created_at DESC");
    return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM shipments WHERE shipment_id = $1", [id]);
    return res.rows[0];
  },

  async findByOrder(orderId) {
    const res = await pool.query("SELECT * FROM shipments WHERE order_id = $1 ORDER BY created_at DESC", [orderId]);
    return res.rows;
  },

  async create({ order_id, carrier, tracking_number, status, shipped_at = null, delivered_at = null, metadata = null }) {
    const res = await pool.query(
      `INSERT INTO shipments (order_id, carrier, tracking_number, status, shipped_at, delivered_at, metadata)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [order_id, carrier, tracking_number, status, shipped_at, delivered_at, metadata]
    );
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["carrier", "tracking_number", "status", "shipped_at", "delivered_at", "metadata"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);
    const q = `UPDATE shipments SET ${fields.join(", ")}, updated_at = now() WHERE shipment_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM shipments WHERE shipment_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
