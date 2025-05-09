const paymentModel = require('../models/paymentModel');

exports.getPayments = async (req, res) => {
  try {
    const { data, error } = await paymentModel.getPayments();
    if (error) return res.status(400).json({ success: false, message: 'Lỗi lấy danh sách thanh toán', error });
    res.status(200).json({ success: true, message: 'Lấy danh sách thanh toán thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await paymentModel.getPaymentById(id);
    if (error || !data) return res.status(404).json({ success: false, message: 'Không tìm thấy thanh toán', error });
    res.status(200).json({ success: true, message: 'Lấy thanh toán thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createPayment = async (req, res) => {
  try {
    const { data, error } = await paymentModel.createPayment(req.body);
    if (error) return res.status(400).json({ success: false, message: 'Tạo thanh toán thất bại', error });
    res.status(201).json({ success: true, message: 'Tạo thanh toán thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await paymentModel.updatePayment(id, req.body);
    if (error) return res.status(400).json({ success: false, message: 'Cập nhật thanh toán thất bại', error });
    res.status(200).json({ success: true, message: 'Cập nhật thanh toán thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await paymentModel.deletePayment(id);
    if (error) return res.status(400).json({ success: false, message: 'Xoá thanh toán thất bại', error });
    res.status(200).json({ success: true, message: 'Xoá thanh toán thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
