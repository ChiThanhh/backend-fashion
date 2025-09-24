import { BrandModel } from "../models/brandModel.js";

export const BrandController = {
  async getAll(req, res) {
    try {
      const brands = await BrandModel.findAll();
      return res.success(brands, "Lấy danh sách thương hiệu thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy danh sách thương hiệu", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const brand = await BrandModel.findById(req.params.id);
      if (!brand) {
        return res.error("Không tìm thấy thương hiệu", "BRAND_NOT_FOUND", 404);
      }
      return res.success(brand, "Lấy thương hiệu thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy thương hiệu", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const brand = await BrandModel.create(req.body);
      return res.success(brand, "Tạo thương hiệu thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi tạo thương hiệu", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const brand = await BrandModel.update(req.params.id, req.body);
      if (!brand) {
        return res.error("Không tìm thấy thương hiệu để cập nhật", "BRAND_NOT_FOUND", 404);
      }
      return res.success(brand, "Cập nhật thương hiệu thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi cập nhật thương hiệu", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const brand = await BrandModel.delete(req.params.id);
      if (!brand) {
        return res.error("Không tìm thấy thương hiệu để xóa", "BRAND_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa thương hiệu thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi xóa thương hiệu", "SERVER_ERROR", 500, err.message);
    }
  },
};
