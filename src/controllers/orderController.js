const orderModel = require('../models/orderModel');

exports.getOrders = async (req, res) => {
  try {
    const { data, error } = await orderModel.getOrders();
    if (error) return res.status(400).json({ success: false, message: 'Lỗi khi lấy đơn hàng', error });
    res.status(200).json({ success: true, message: 'Lấy danh sách đơn hàng thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await orderModel.getOrderById(id);
    if (error || !data) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng', error });
    res.status(200).json({ success: true, message: 'Lấy đơn hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { data, error } = await orderModel.createOrder(req.body);
    if (error) return res.status(400).json({ success: false, message: 'Tạo đơn hàng thất bại', error });
    res.status(201).json({ success: true, message: 'Tạo đơn hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await orderModel.updateOrder(id, req.body);
    if (error) return res.status(400).json({ success: false, message: 'Cập nhật đơn hàng thất bại', error });
    res.status(200).json({ success: true, message: 'Cập nhật đơn hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await orderModel.deleteOrder(id);
    if (error) return res.status(400).json({ success: false, message: 'Xoá đơn hàng thất bại', error });
    res.status(200).json({ success: true, message: 'Xoá đơn hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
