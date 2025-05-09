const brandModel = require('../models/brandModel');

exports.getBrands = async (req, res) => {
  try {
    const { data, error } = await brandModel.getBrands();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy danh sách thương hiệu thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy danh sách thương hiệu thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await brandModel.getBrandById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thương hiệu', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy thương hiệu theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createBrand = async (req, res) => {
  try {
    const { data, error } = await brandModel.createBrand(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo thương hiệu thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo thương hiệu thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await brandModel.updateBrand(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật thương hiệu thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật thương hiệu thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await brandModel.deleteBrand(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá thương hiệu thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá thương hiệu thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
