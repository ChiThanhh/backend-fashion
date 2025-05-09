const shippingModel = require('../models/shippingModel');

exports.getShippings = async (req, res) => {
  try {
    const { data, error } = await shippingModel.getShippings();
    if (error) return res.status(400).json({ success: false, message: 'Lỗi lấy danh sách giao hàng', error });
    res.status(200).json({ success: true, message: 'Lấy danh sách giao hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getShippingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await shippingModel.getShippingById(id);
    if (error || !data) return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin giao hàng', error });
    res.status(200).json({ success: true, message: 'Lấy thông tin giao hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createShipping = async (req, res) => {
  try {
    const { data, error } = await shippingModel.createShipping(req.body);
    if (error) return res.status(400).json({ success: false, message: 'Tạo thông tin giao hàng thất bại', error });
    res.status(201).json({ success: true, message: 'Tạo thông tin giao hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await shippingModel.updateShipping(id, req.body);
    if (error) return res.status(400).json({ success: false, message: 'Cập nhật thông tin giao hàng thất bại', error });
    res.status(200).json({ success: true, message: 'Cập nhật thông tin giao hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteShipping = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await shippingModel.deleteShipping(id);
    if (error) return res.status(400).json({ success: false, message: 'Xoá thông tin giao hàng thất bại', error });
    res.status(200).json({ success: true, message: 'Xoá thông tin giao hàng thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
