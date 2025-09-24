import { PriceModel } from "../models/priceModel.js";
import { findByProductColorSize } from "../models/priceModel.js";

export const PriceController = {
  async getAll(req, res) {
    try {
      const prices = await PriceModel.findAll();
      return res.success(prices, "Lấy danh sách giá thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách giá", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const price = await PriceModel.findById(req.params.id);
      if (!price) return res.error("Không tìm thấy giá", "PRICE_NOT_FOUND", 404);
      return res.success(price, "Lấy thông tin giá thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy thông tin giá", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const price = await PriceModel.create(req.body);
      return res.success(price, "Tạo giá thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo giá", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const price = await PriceModel.update(req.params.id, req.body);
      if (!price) return res.error("Không tìm thấy giá", "PRICE_NOT_FOUND", 404);
      return res.success(price, "Cập nhật giá thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật giá", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const price = await PriceModel.delete(req.params.id);
      if (!price) return res.error("Không tìm thấy giá", "PRICE_NOT_FOUND", 404);
      return res.success(null, "Xóa giá thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa giá", "SERVER_ERROR", 500, err.message);
    }
  }
};

// GET /prices/getprice?product_id=...&color_id=...&size_id=...
export async function getByColorAndSize(req, res) {
  try {
    const { product_id, color_id, size_id } = req.query;
    if (!product_id) {
      return res.error("Thiếu product_id", "VALIDATION_ERROR", 400);
    }
    const price = await findByProductColorSize({ product_id, color_id: color_id || null, size_id: size_id || null });
    if (!price) return res.error("Không tìm thấy giá phù hợp", "PRICE_NOT_FOUND", 404);
    return res.success(price, "Lấy giá theo color/size thành công");
  } catch (err) {
    console.error(err);
    return res.error("Lỗi khi lấy giá theo color/size", "SERVER_ERROR", 500, err.message);
  }
}
