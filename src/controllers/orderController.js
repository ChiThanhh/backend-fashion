import { OrderModel } from "../models/orderModel.js";

export const OrderController = {
  async getAll(req, res) {
    try {
      const orders = await OrderModel.findAll();
      return res.success(orders, "Lấy danh sách đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const order = await OrderModel.findById(req.params.id);
      if (!order) return res.error("Không tìm thấy đơn hàng", "ORDER_NOT_FOUND", 404);
      return res.success(order, "Lấy thông tin đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy thông tin đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const order = await OrderModel.create(req.body);
      return res.success(order, "Tạo đơn hàng thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const order = await OrderModel.update(req.params.id, req.body);
      if (!order) return res.error("Không tìm thấy đơn hàng", "ORDER_NOT_FOUND", 404);
      return res.success(order, "Cập nhật đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const order = await OrderModel.delete(req.params.id);
      if (!order) return res.error("Không tìm thấy đơn hàng", "ORDER_NOT_FOUND", 404);
      return res.success(null, "Xóa đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  }
};
