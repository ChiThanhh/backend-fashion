import { ReturnModel } from "../models/returnModel.js";
import { ReturnItemModel } from "../models/returnItemModel.js";

export const ReturnController = {
  async getAll(req, res) {
    try {
      const returns = await ReturnModel.findAll();
      return res.success(returns, "Lấy danh sách phiếu trả hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách phiếu trả hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const ret = await ReturnModel.findById(req.params.id);
      if (!ret) return res.error("Không tìm thấy phiếu trả hàng", "RETURN_NOT_FOUND", 404);

      const items = await ReturnItemModel.findByReturn(req.params.id);
      return res.success({ ...ret, items }, "Lấy thông tin phiếu trả hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy phiếu trả hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async getByOrder(req, res) {
    try {
      const returns = await ReturnModel.findByOrder(req.params.orderId);
      return res.success(returns, "Lấy danh sách phiếu trả hàng theo đơn hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy phiếu trả hàng theo đơn hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      // Expect: { order_id, status, reason, refund_id?, metadata?, items: [...] }
      const { items = [], ...data } = req.body;
      const ret = await ReturnModel.create(data);

      const retItems = [];
      for (const item of items) {
        const ri = await ReturnItemModel.create({
          return_id: ret.return_id,
          order_item_id: item.order_item_id,
          quantity: item.quantity,
          reason: item.reason
        });
        retItems.push(ri);
      }

      return res.success({ ...ret, items: retItems }, "Tạo phiếu trả hàng thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo phiếu trả hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const ret = await ReturnModel.update(req.params.id, req.body);
      if (!ret) return res.error("Không tìm thấy phiếu trả hàng", "RETURN_NOT_FOUND", 404);
      return res.success(ret, "Cập nhật phiếu trả hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật phiếu trả hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const ret = await ReturnModel.delete(req.params.id);
      if (!ret) return res.error("Không tìm thấy phiếu trả hàng", "RETURN_NOT_FOUND", 404);
      return res.success(null, "Xóa phiếu trả hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa phiếu trả hàng", "SERVER_ERROR", 500, err.message);
    }
  }
};
