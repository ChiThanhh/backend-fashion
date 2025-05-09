const menuModel = require('../models/menuModel');

exports.getMenu = async (req, res) => {
  try {
    const { data, error } = await menuModel.getMenu();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy menu thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy menu thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await menuModel.getMenuById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy menu', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy menu theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createMenu = async (req, res) => {
  try {
    const { data, error } = await menuModel.createMenu(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo menu thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo menu thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await menuModel.updateMenu(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật menu thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật menu thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await menuModel.deleteMenu(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá menu thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá menu thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
