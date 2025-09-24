// src/controllers/sizeController.js
import { SizeModel } from "../models/sizeModel.js";

export const SizeController = {
  async getAll(req, res) {
    try {
      const sizes = await SizeModel.findAll();
      return res.success(sizes, "Lấy danh sách size thành công!");
    } catch (err) {
      return res.error("Lỗi khi lấy danh sách size", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const size = await SizeModel.findById(req.params.id);
      if (!size) {
        return res.error("Size không tồn tại!", "SIZE_NOT_FOUND", 404);
      }
      return res.success(size, "Lấy size thành công!");
    } catch (err) {
      return res.error("Lỗi khi lấy size", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const size = await SizeModel.create(req.body);
      return res.success(size, "Tạo size thành công!", 201);
    } catch (err) {
      return res.error("Lỗi khi tạo size", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const size = await SizeModel.update(req.params.id, req.body);
      if (!size) {
        return res.error("Size không tồn tại!", "SIZE_NOT_FOUND", 404);
      }
      return res.success(size, "Cập nhật size thành công!");
    } catch (err) {
      return res.error("Lỗi khi cập nhật size", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const size = await SizeModel.delete(req.params.id);
      if (!size) {
        return res.error("Size không tồn tại!", "SIZE_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa size thành công!");
    } catch (err) {
      return res.error("Lỗi khi xóa size", "SERVER_ERROR", 500, err.message);
    }
  },
};
