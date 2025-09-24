import { CartModel } from "../models/cartModel.js";

export const CartController = {
  async getAll(req, res) {
    try {
      const cart = await CartModel.findByUser(req.user.user_id);
      return res.success(cart, "Lấy giỏ hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy giỏ hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const cart = await CartModel.findById(req.params.id);
      if (!cart) {
        return res.error("Không tìm thấy giỏ hàng", "CART_NOT_FOUND", 404);
      }
      return res.success(cart, "Lấy giỏ hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy giỏ hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const cart = await CartModel.createCart(req.user.user_id, req.body.currency);
      return res.success(cart, "Tạo giỏ hàng thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi tạo giỏ hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const item = await CartModel.updateItem(req.params.id, req.body.qty);
      if (!item) {
        return res.error("Không tìm thấy sản phẩm trong giỏ", "CART_ITEM_NOT_FOUND", 404);
      }
      return res.success(item, "Cập nhật sản phẩm trong giỏ thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi cập nhật giỏ hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const item = await CartModel.removeItem(req.params.id);
      if (!item) {
        return res.error("Không tìm thấy sản phẩm trong giỏ", "CART_ITEM_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa sản phẩm khỏi giỏ hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi xóa sản phẩm khỏi giỏ", "SERVER_ERROR", 500, err.message);
    }
  },
};
