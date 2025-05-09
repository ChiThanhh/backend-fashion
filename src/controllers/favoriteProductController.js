const favoriteProductModel = require('../models/favoriteProductModel'); // Thay đổi thành favoriteProductModel

exports.getFavoriteProducts = async (req, res) => {
  try {
    const { data, error } = await favoriteProductModel.getFavoriteProducts();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy danh sách sản phẩm yêu thích thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy danh sách sản phẩm yêu thích thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getFavoriteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await favoriteProductModel.getFavoriteProductById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy sản phẩm yêu thích', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy sản phẩm yêu thích theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createFavoriteProduct = async (req, res) => {
  try {
    const { data, error } = await favoriteProductModel.createFavoriteProduct(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo sản phẩm yêu thích thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo sản phẩm yêu thích thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateFavoriteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await favoriteProductModel.updateFavoriteProduct(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật sản phẩm yêu thích thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật sản phẩm yêu thích thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteFavoriteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await favoriteProductModel.deleteFavoriteProduct(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá sản phẩm yêu thích thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá sản phẩm yêu thích thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
