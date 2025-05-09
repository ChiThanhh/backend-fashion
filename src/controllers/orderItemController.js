const orderItemModel = require('../models/orderItemModel');

exports.getOrderItems = async (req, res) => {
  try {
    const { data, error } = await orderItemModel.getOrderItems();
    if (error) return res.status(400).json({ success: false, message: 'Lỗi lấy danh sách', error });
    res.status(200).json({ success: true, message: 'Lấy danh sách thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await orderItemModel.getOrderItemById(id);
    if (error || !data) return res.status(404).json({ success: false, message: 'Không tìm thấy mục đơn hàng', error });
    res.status(200).json({ success: true, message: 'Lấy mục đơn hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createOrderItem = async (req, res) => {
  try {
    const { data, error } = await orderItemModel.createOrderItem(req.body);
    if (error) return res.status(400).json({ success: false, message: 'Tạo mục đơn hàng thất bại', error });
    res.status(201).json({ success: true, message: 'Tạo mục đơn hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await orderItemModel.updateOrderItem(id, req.body);
    if (error) return res.status(400).json({ success: false, message: 'Cập nhật mục đơn hàng thất bại', error });
    res.status(200).json({ success: true, message: 'Cập nhật mục đơn hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await orderItemModel.deleteOrderItem(id);
    if (error) return res.status(400).json({ success: false, message: 'Xoá mục đơn hàng thất bại', error });
    res.status(200).json({ success: true, message: 'Xoá mục đơn hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
