const cartModel = require('../models/cartModel'); // Giả sử bạn đã có model cartModel

exports.getCarts = async (req, res) => {
  try {
    const { data, error } = await cartModel.getCarts();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy giỏ hàng thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy giỏ hàng thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await cartModel.getCartById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy giỏ hàng', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy giỏ hàng theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createCart = async (req, res) => {
  try {
    const { data, error } = await cartModel.createCart(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo giỏ hàng thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo giỏ hàng thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await cartModel.updateCart(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật giỏ hàng thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật giỏ hàng thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await cartModel.deleteCart(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá giỏ hàng thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá giỏ hàng thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
