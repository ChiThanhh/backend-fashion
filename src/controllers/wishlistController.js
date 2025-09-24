// src/controllers/wishlistController.js
import { WishlistModel } from "../models/wishlistModel.js";

export const WishlistController = {
  async getAll(req, res) {
    try {
      const wishlist = await WishlistModel.findByUser(req.user.user_id);
      return res.success(wishlist, "Lấy danh sách wishlist thành công!");
    } catch (err) {
      console.error(err);
      return res.error(
        "Lỗi khi lấy danh sách wishlist",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async getById(req, res) {
    try {
      const wishlist = await WishlistModel.findById(req.params.id);
      if (!wishlist) {
        return res.error("Không tìm thấy wishlist!", "WISHLIST_NOT_FOUND", 404);
      }
      return res.success(wishlist, "Lấy wishlist thành công!");
    } catch (err) {
      console.error(err);
      return res.error(
        "Lỗi khi lấy wishlist",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async create(req, res) {
    try {
      const wishlist = await WishlistModel.createWishlist(req.user.user_id);
      return res.success(wishlist, "Tạo wishlist thành công!", 201);
    } catch (err) {
      console.error(err);
      return res.error(
        "Lỗi khi tạo wishlist",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async update(req, res) {
    try {
      const item = await WishlistModel.addItem(
        req.params.id,
        req.body.product_id
      );
      if (!item) {
        return res.error(
          "Không tìm thấy sản phẩm trong wishlist!",
          "WISHLIST_ITEM_NOT_FOUND",
          404
        );
      }
      return res.success(item, "Cập nhật wishlist thành công!");
    } catch (err) {
      console.error(err);
      return res.error(
        "Lỗi khi cập nhật wishlist",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async delete(req, res) {
    try {
      const item = await WishlistModel.removeItem(
        req.params.id,
        req.body.product_id
      );
      if (!item) {
        return res.error(
          "Không tìm thấy sản phẩm trong wishlist!",
          "WISHLIST_ITEM_NOT_FOUND",
          404
        );
      }
      return res.success(null, "Xóa sản phẩm khỏi wishlist thành công!");
    } catch (err) {
      console.error(err);
      return res.error(
        "Lỗi khi xóa sản phẩm khỏi wishlist",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },
};
