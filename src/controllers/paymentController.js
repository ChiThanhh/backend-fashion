import { PaymentModel } from "../models/paymentModel.js";

export const PaymentController = {
  async getAll(req, res) {
    try {
      const payments = await PaymentModel.findAll();
      return res.success(payments, "Lấy danh sách thanh toán thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách thanh toán", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const payment = await PaymentModel.findById(req.params.id);
      if (!payment) return res.error("Không tìm thấy thanh toán", "PAYMENT_NOT_FOUND", 404);
      return res.success(payment, "Lấy thông tin thanh toán thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy thông tin thanh toán", "SERVER_ERROR", 500, err.message);
    }
  },

  async getByOrder(req, res) {
    try {
      const payments = await PaymentModel.findByOrder(req.params.orderId);
      return res.success(payments, "Lấy danh sách thanh toán theo đơn thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách thanh toán theo đơn", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const payload = req.body.payload || null;
      const payment = await PaymentModel.create({
        order_id: req.body.order_id,
        provider: req.body.provider,
        status: req.body.status,
        amount: req.body.amount,
        currency: req.body.currency,
        transaction_ref: req.body.transaction_ref || null,
        payload
      });
      return res.success(payment, "Tạo thanh toán thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo thanh toán", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const payment = await PaymentModel.update(req.params.id, req.body);
      if (!payment) return res.error("Không tìm thấy thanh toán", "PAYMENT_NOT_FOUND", 404);
      return res.success(payment, "Cập nhật thanh toán thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật thanh toán", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const payment = await PaymentModel.delete(req.params.id);
      if (!payment) return res.error("Không tìm thấy thanh toán", "PAYMENT_NOT_FOUND", 404);
      return res.success(null, "Xóa thanh toán thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa thanh toán", "SERVER_ERROR", 500, err.message);
    }
  }
};
