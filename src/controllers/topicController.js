const topicModel = require('../models/topicModel');

exports.getTopic = async (req, res) => {
  try {
    const { data, error } = await topicModel.getTopics();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy topic thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy topic thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await topicModel.getTopicById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy topic', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy topic theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const { data, error } = await topicModel.createTopic(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo topic thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo topic thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await topicModel.updateTopic(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật topic thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật topic thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await topicModel.deleteTopic(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá topic thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá topic thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
