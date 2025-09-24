import { CouponModel } from "../models/couponModel.js";

export const CouponController = {
  async getAll(req, res) {
    try {
      const list = await CouponModel.findAll();
      return res.success(list, "Lấy danh sách coupon thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy danh sách coupon", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const coupon = await CouponModel.findById(req.params.id);
      if (!coupon) {
        return res.error("Không tìm thấy coupon", "COUPON_NOT_FOUND", 404);
      }
      return res.success(coupon, "Lấy thông tin coupon thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy thông tin coupon", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const coupon = await CouponModel.create(req.body);
      return res.success(coupon, "Tạo coupon thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi tạo coupon", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const coupon = await CouponModel.update(req.params.id, req.body);
      if (!coupon) {
        return res.error("Không tìm thấy coupon", "COUPON_NOT_FOUND", 404);
      }
      return res.success(coupon, "Cập nhật coupon thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi cập nhật coupon", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const coupon = await CouponModel.delete(req.params.id);
      if (!coupon) {
        return res.error("Không tìm thấy coupon", "COUPON_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa coupon thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi xóa coupon", "SERVER_ERROR", 500, err.message);
    }
  },
};
