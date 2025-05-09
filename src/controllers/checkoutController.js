const checkoutModel = require('../models/checkoutModel');

exports.getCheckouts = async (req, res) => {
  try {
    const { data, error } = await checkoutModel.getCheckouts();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy danh sách đơn thanh toán thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy danh sách đơn thanh toán thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getCheckoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await checkoutModel.getCheckoutById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy đơn thanh toán', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy đơn thanh toán theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createCheckout = async (req, res) => {
  try {
    const { data, error } = await checkoutModel.createCheckout(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo đơn thanh toán thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo đơn thanh toán thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await checkoutModel.updateCheckout(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật đơn thanh toán thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật đơn thanh toán thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await checkoutModel.deleteCheckout(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá đơn thanh toán thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá đơn thanh toán thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
