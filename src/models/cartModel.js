import pool from "../config/db.js";

export const CartModel = {
  async findByUser(userId) {
    const res = await pool.query(
      `SELECT c.cart_id, c.user_id, c.currency, c.created_at, c.updated_at,
              ci.cart_item_id, ci.variant_id, ci.qty, ci.unit_price
       FROM carts c
       LEFT JOIN cart_items ci ON c.cart_id = ci.cart_id
       WHERE c.user_id = $1`,
      [userId]
    );
    return res.rows;
  },

  async createCart(userId, currency = "VND") {
    const res = await pool.query(
      `INSERT INTO carts (user_id, currency) VALUES ($1, $2) RETURNING *`,
      [userId, currency]
    );
    return res.rows[0];
  },

  async addItem(cart_id, variant_id, qty, unit_price) {
    const res = await pool.query(
      `INSERT INTO cart_items (cart_id, variant_id, qty, unit_price)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [cart_id, variant_id, qty, unit_price]
    );
    return res.rows[0];
  },

  async updateItem(cart_item_id, qty) {
    const res = await pool.query(
      `UPDATE cart_items
       SET qty = $1
       WHERE cart_item_id = $2
       RETURNING *`,
      [qty, cart_item_id]
    );
    return res.rows[0];
  },

  async removeItem(cart_item_id) {
    const res = await pool.query(
      `DELETE FROM cart_items WHERE cart_item_id = $1 RETURNING *`,
      [cart_item_id]
    );
    return res.rows[0] || null;
  },

  async clearCart(cart_id) {
    const res = await pool.query(
      `DELETE FROM cart_items WHERE cart_id = $1 RETURNING *`,
      [cart_id]
    );
    return res.rows;
  }
};
