import { CategoryModel } from "../models/categoryModel.js";

export const CategoryController = {
  async getAll(req, res) {
    try {
      const categories = await CategoryModel.findAll();
      return res.success(categories, "Lấy danh mục thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy danh mục", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const category = await CategoryModel.findById(req.params.id);
      if (!category) {
        return res.error("Không tìm thấy danh mục", "CATEGORY_NOT_FOUND", 404);
      }
      return res.success(category, "Lấy chi tiết danh mục thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy danh mục", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const category = await CategoryModel.create(req.body);
      return res.success(category, "Tạo mới danh mục thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi tạo danh mục", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const category = await CategoryModel.update(req.params.id, req.body);
      if (!category) {
        return res.error("Không tìm thấy danh mục", "CATEGORY_NOT_FOUND", 404);
      }
      return res.success(category, "Cập nhật danh mục thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi cập nhật danh mục", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const category = await CategoryModel.delete(req.params.id);
      if (!category) {
        return res.error("Không tìm thấy danh mục", "CATEGORY_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa danh mục thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi xóa danh mục", "SERVER_ERROR", 500, err.message);
    }
  },
};
