import { ReviewModel } from "../models/reviewModel.js";

export const ReviewController = {
  async getAll(req, res) {
    try {
      const reviews = await ReviewModel.findAll();
      return res.success(reviews, "Lấy danh sách đánh giá thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách đánh giá", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const review = await ReviewModel.findById(req.params.id);
      if (!review) return res.error("Không tìm thấy đánh giá", "REVIEW_NOT_FOUND", 404);
      return res.success(review, "Lấy thông tin đánh giá thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy đánh giá", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const review = await ReviewModel.create(req.body);
      return res.success(review, "Tạo đánh giá thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo đánh giá", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const review = await ReviewModel.update(req.params.id, req.body);
      if (!review) return res.error("Không tìm thấy đánh giá", "REVIEW_NOT_FOUND", 404);
      return res.success(review, "Cập nhật đánh giá thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật đánh giá", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const review = await ReviewModel.delete(req.params.id);
      if (!review) return res.error("Không tìm thấy đánh giá", "REVIEW_NOT_FOUND", 404);
      return res.success(null, "Xóa đánh giá thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa đánh giá", "SERVER_ERROR", 500, err.message);
    }
  }
};
