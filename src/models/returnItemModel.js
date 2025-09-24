import pool from "../config/db.js";

export const ReturnItemModel = {
  async findByReturn(returnId) {
    const res = await pool.query("SELECT * FROM return_items WHERE return_id = $1", [returnId]);
    return res.rows;
  },

  async create({ return_id, order_item_id, quantity, reason }) {
    const res = await pool.query(
      `INSERT INTO return_items (return_id, order_item_id, quantity, reason)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [return_id, order_item_id, quantity, reason]
    );
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM return_items WHERE return_item_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  }
};
