import pool from "../config/db.js";

export const ShipmentItemModel = {
  async findByShipment(shipmentId) {
    const res = await pool.query("SELECT * FROM shipment_items WHERE shipment_id = $1", [shipmentId]);
    return res.rows;
  },

  async create({ shipment_id, order_item_id, quantity }) {
    const res = await pool.query(
      `INSERT INTO shipment_items (shipment_id, order_item_id, quantity)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [shipment_id, order_item_id, quantity]
    );
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM shipment_items WHERE shipment_item_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
