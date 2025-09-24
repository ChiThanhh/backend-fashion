// src/controllers/attributeController.js
import { AttributeModel } from "../models/attributeModel.js";

export const AttributeController = {
  async getAll(req, res) {
    try {
      const list = await AttributeModel.findAll();
      return res.success(list, "Lấy danh sách thuộc tính thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi lấy danh sách thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async getById(req, res) {
    try {
      const attr = await AttributeModel.findById(req.params.id);
      if (!attr) {
        return res.error(
          "Thuộc tính không tồn tại",
          "ATTRIBUTE_NOT_FOUND",
          404
        );
      }
      return res.success(attr, "Lấy thuộc tính thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi lấy thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async create(req, res) {
    try {
      const attr = await AttributeModel.create(req.body);
      return res.success(attr, "Tạo thuộc tính thành công", 201);
    } catch (err) {
      return res.error(
        "Lỗi server khi tạo thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async update(req, res) {
    try {
      const attr = await AttributeModel.update(req.params.id, req.body);
      if (!attr) {
        return res.error(
          "Thuộc tính không tồn tại",
          "ATTRIBUTE_NOT_FOUND",
          404
        );
      }
      return res.success(attr, "Cập nhật thuộc tính thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi cập nhật thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async delete(req, res) {
    try {
      const attr = await AttributeModel.delete(req.params.id);
      if (!attr) {
        return res.error(
          "Thuộc tính không tồn tại",
          "ATTRIBUTE_NOT_FOUND",
          404
        );
      }
      return res.success(null, "Xóa thuộc tính thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi xóa thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },
};
