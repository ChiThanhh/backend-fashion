const postModel = require('../models/postModel');

exports.getPosts = async (req, res) => {
  try {
    const { data, error } = await postModel.getPosts();
    if (error) {
      return res.status(400).json({ success: false, message: 'Lấy danh sách bài viết thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy danh sách bài viết thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await postModel.getPostById(id);
    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết', error });
    }
    return res.status(200).json({ success: true, message: 'Lấy bài viết theo ID thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { data, error } = await postModel.createPost(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Tạo bài viết thất bại', error });
    }
    return res.status(201).json({ success: true, message: 'Tạo bài viết thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await postModel.updatePost(id, req.body);
    if (error) {
      return res.status(400).json({ success: false, message: 'Cập nhật bài viết thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Cập nhật bài viết thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await postModel.deletePost(id);
    if (error) {
      return res.status(400).json({ success: false, message: 'Xoá bài viết thất bại', error });
    }
    return res.status(200).json({ success: true, message: 'Xoá bài viết thành công', data });
  } catch (err) {
    console.error('Lỗi server:', err);
    return res.status(500).json({ success: false, message: 'Lỗi server', error: err.message });
  }
};
