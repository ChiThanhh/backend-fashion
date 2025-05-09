const productModel = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const { data, error } = await productModel.getProducts();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy danh sách sản phẩm thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy danh sách sản phẩm thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await productModel.getProductById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy sản phẩm theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { data, error } = await productModel.createProduct(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo sản phẩm thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo sản phẩm thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await productModel.updateProduct(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật sản phẩm thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật sản phẩm thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await productModel.deleteProduct(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá sản phẩm thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá sản phẩm thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
