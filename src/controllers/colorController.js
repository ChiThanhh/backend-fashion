import { ColorModel } from "../models/colorModel.js";

export const ColorController = {
  async getAll(req, res) {
    try {
      const colors = await ColorModel.findAll();
      return res.success(colors, "Lấy danh sách màu sắc thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy danh sách màu sắc", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const color = await ColorModel.findById(req.params.id);
      if (!color) {
        return res.error("Không tìm thấy màu sắc", "COLOR_NOT_FOUND", 404);
      }
      return res.success(color, "Lấy chi tiết màu sắc thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy chi tiết màu sắc", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const color = await ColorModel.create(req.body);
      return res.success(color, "Tạo màu sắc mới thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi tạo màu sắc", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const color = await ColorModel.update(req.params.id, req.body);
      if (!color) {
        return res.error("Không tìm thấy màu sắc", "COLOR_NOT_FOUND", 404);
      }
      return res.success(color, "Cập nhật màu sắc thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi cập nhật màu sắc", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const color = await ColorModel.delete(req.params.id);
      if (!color) {
        return res.error("Không tìm thấy màu sắc", "COLOR_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa màu sắc thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi xóa màu sắc", "SERVER_ERROR", 500, err.message);
    }
  },
};
