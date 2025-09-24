import { RefundModel } from "../models/refundModel.js";

export const RefundController = {
  async getAll(req, res) {
    try {
      const refunds = await RefundModel.findAll();
      return res.success(refunds, "Lấy danh sách hoàn tiền thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách hoàn tiền", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const refund = await RefundModel.findById(req.params.id);
      if (!refund) return res.error("Không tìm thấy hoàn tiền", "REFUND_NOT_FOUND", 404);
      return res.success(refund, "Lấy thông tin hoàn tiền thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy thông tin hoàn tiền", "SERVER_ERROR", 500, err.message);
    }
  },

  async getByReturn(req, res) {
    try {
      const refund = await RefundModel.findByReturn(req.params.returnId);
      return res.success(refund, "Lấy thông tin hoàn tiền theo phiếu trả hàng thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy hoàn tiền theo phiếu trả hàng", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const refund = await RefundModel.create(req.body);
      return res.success(refund, "Tạo hoàn tiền thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo hoàn tiền", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const refund = await RefundModel.update(req.params.id, req.body);
      if (!refund) return res.error("Không tìm thấy hoàn tiền", "REFUND_NOT_FOUND", 404);
      return res.success(refund, "Cập nhật hoàn tiền thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật hoàn tiền", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const refund = await RefundModel.delete(req.params.id);
      if (!refund) return res.error("Không tìm thấy hoàn tiền", "REFUND_NOT_FOUND", 404);
      return res.success(null, "Xóa hoàn tiền thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa hoàn tiền", "SERVER_ERROR", 500, err.message);
    }
  }
};
