import { PromotionModel } from "../models/promotionModel.js";

export const PromotionController = {
  async getAll(req, res) {
    try {
      const promotions = await PromotionModel.findAll();
      return res.success(promotions, "Lấy danh sách khuyến mãi thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách khuyến mãi", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const promo = await PromotionModel.findById(req.params.id);
      if (!promo) return res.error("Không tìm thấy khuyến mãi", "PROMOTION_NOT_FOUND", 404);
      return res.success(promo, "Lấy thông tin khuyến mãi thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy thông tin khuyến mãi", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const promo = await PromotionModel.create(req.body);
      return res.success(promo, "Tạo khuyến mãi thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo khuyến mãi", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const promo = await PromotionModel.update(req.params.id, req.body);
      if (!promo) return res.error("Không tìm thấy khuyến mãi", "PROMOTION_NOT_FOUND", 404);
      return res.success(promo, "Cập nhật khuyến mãi thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật khuyến mãi", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const promo = await PromotionModel.delete(req.params.id);
      if (!promo) return res.error("Không tìm thấy khuyến mãi", "PROMOTION_NOT_FOUND", 404);
      return res.success(null, "Xóa khuyến mãi thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa khuyến mãi", "SERVER_ERROR", 500, err.message);
    }
  }
};
