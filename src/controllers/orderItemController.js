import { OrderItemModel } from "../models/orderItemModel.js";

export const OrderItemController = {
  async getAll(req, res) {
    try {
      const items = await OrderItemModel.findAll();
      return res.success(items, "Lấy danh sách chi tiết đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách chi tiết đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const item = await OrderItemModel.findById(req.params.id);
      if (!item) return res.error("Không tìm thấy chi tiết đơn hàng", "ORDER_ITEM_NOT_FOUND", 404);
      return res.success(item, "Lấy chi tiết đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy chi tiết đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async getByOrder(req, res) {
    try {
      const items = await OrderItemModel.findByOrder(req.params.orderId);
      return res.success(items, "Lấy danh sách chi tiết đơn hàng theo đơn thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy chi tiết đơn hàng theo đơn", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const item = await OrderItemModel.create(req.body);
      return res.success(item, "Tạo chi tiết đơn hàng thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo chi tiết đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const item = await OrderItemModel.update(req.params.id, req.body);
      if (!item) return res.error("Không tìm thấy chi tiết đơn hàng", "ORDER_ITEM_NOT_FOUND", 404);
      return res.success(item, "Cập nhật chi tiết đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật chi tiết đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const item = await OrderItemModel.delete(req.params.id);
      if (!item) return res.error("Không tìm thấy chi tiết đơn hàng", "ORDER_ITEM_NOT_FOUND", 404);
      return res.success(null, "Xóa chi tiết đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa chi tiết đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  }
};
