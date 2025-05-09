const sliderModel = require('../models/sliderModel');  // Thay 'topicModel' thành 'sliderModel'

exports.getSliders = async (req, res) => {
  try {
    const { data, error } = await sliderModel.getSliders();  // Thay 'getTopics' thành 'getSliders'
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy sliders thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy sliders thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getSliderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await sliderModel.getSliderById(id);  // Thay 'getTopicById' thành 'getSliderById'
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy slider', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy slider theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createSlider = async (req, res) => {
  try {
    const { data, error } = await sliderModel.createSlider(req.body);  // Thay 'createTopic' thành 'createSlider'
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo slider thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo slider thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updateSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await sliderModel.updateSlider(id, req.body);  // Thay 'updateTopic' thành 'updateSlider'
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật slider thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật slider thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await sliderModel.deleteSlider(id);  // Thay 'deleteTopic' thành 'deleteSlider'
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá slider thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá slider thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
