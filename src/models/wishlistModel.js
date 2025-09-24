import pool from "../config/db.js";

export const WishlistModel = {
  async findByUser(userId) {
    const res = await pool.query(
      `SELECT w.wishlist_id, w.user_id, w.created_at,
              wi.product_id
       FROM wishlists w
       LEFT JOIN wishlist_items wi ON w.wishlist_id = wi.wishlist_id
       WHERE w.user_id = $1`,
      [userId]
    );
    return res.rows;
  },

  async createWishlist(userId) {
    const res = await pool.query(
      `INSERT INTO wishlists (user_id) VALUES ($1) RETURNING *`,
      [userId]
    );
    return res.rows[0];
  },

  async addItem(wishlist_id, product_id) {
    const res = await pool.query(
      `INSERT INTO wishlist_items (wishlist_id, product_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING
       RETURNING *`,
      [wishlist_id, product_id]
    );
    return res.rows[0];
  },

  async removeItem(wishlist_id, product_id) {
    const res = await pool.query(
      `DELETE FROM wishlist_items
       WHERE wishlist_id = $1 AND product_id = $2
       RETURNING *`,
      [wishlist_id, product_id]
    );
    return res.rows[0] || null;
  }
};
