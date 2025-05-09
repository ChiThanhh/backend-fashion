const settingModel = require('../models/settingModel');

exports.getSettings = async (req, res) => {
  try {
    const { data, error } = await settingModel.getSettings();
    if (error) return res.status(400).json({ success: false, message: 'Lỗi lấy cài đặt', error });
    res.status(200).json({ success: true, message: 'Lấy danh sách cài đặt thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getSettingById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await settingModel.getSettingById(id);
    if (error || !data) return res.status(404).json({ success: false, message: 'Không tìm thấy cài đặt', error });
    res.status(200).json({ success: true, message: 'Lấy cài đặt thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createSetting = async (req, res) => {
  try {
    const { data, error } = await settingModel.createSetting(req.body);
    if (error) return res.status(400).json({ success: false, message: 'Tạo cài đặt thất bại', error });
    res.status(201).json({ success: true, message: 'Tạo cài đặt thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await settingModel.updateSetting(id, req.body);
    if (error) return res.status(400).json({ success: false, message: 'Cập nhật cài đặt thất bại', error });
    res.status(200).json({ success: true, message: 'Cập nhật cài đặt thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await settingModel.deleteSetting(id);
    if (error) return res.status(400).json({ success: false, message: 'Xoá cài đặt thất bại', error });
    res.status(200).json({ success: true, message: 'Xoá cài đặt thành công', data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
