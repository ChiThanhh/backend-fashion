const categoryModel = require('../models/categoryModel');

exports.getCategories = async (req, res) => {
  try {
    const { data, error } = await categoryModel.getCategories();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy danh mục thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy danh mục thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await categoryModel.getCategoryById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy danh mục', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy danh mục theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { data, error } = await categoryModel.createCategory(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo danh mục thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo danh mục thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await categoryModel.updateCategory(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật danh mục thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật danh mục thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await categoryModel.deleteCategory(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá danh mục thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá danh mục thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
