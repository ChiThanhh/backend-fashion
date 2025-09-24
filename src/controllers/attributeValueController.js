// src/controllers/attributeValueController.js
import { AttributeValueModel } from "../models/attributeValueModel.js";

export const AttributeValueController = {
  async getAll(req, res) {
    try {
      const list = await AttributeValueModel.findAll();
      return res.success(list, "Lấy danh sách giá trị thuộc tính thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi lấy danh sách giá trị thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async getById(req, res) {
    try {
      const val = await AttributeValueModel.findById(req.params.id);
      if (!val) {
        return res.error(
          "Giá trị thuộc tính không tồn tại",
          "ATTRIBUTE_VALUE_NOT_FOUND",
          404
        );
      }
      return res.success(val, "Lấy giá trị thuộc tính thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi lấy giá trị thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },
async getByAttributeId(req, res) {
  try {
    const vals = await AttributeValueModel.findByAttributeId(req.params.id);
    if (!vals || vals.length === 0) {
      return res.error(
        "Không tìm thấy giá trị nào cho thuộc tính này",
        "ATTRIBUTE_VALUES_NOT_FOUND",
        404
      );
    }
    return res.success(vals, "Lấy giá trị thuộc tính thành công");
  } catch (err) {
    return res.error(
      "Lỗi server khi lấy giá trị thuộc tính",
      "SERVER_ERROR",
      500,
      err.message
    );
  }
},


  async create(req, res) {
    try {
      const val = await AttributeValueModel.create(req.body);
      return res.success(val, "Tạo giá trị thuộc tính thành công", 201);
    } catch (err) {
      return res.error(
        "Lỗi server khi tạo giá trị thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async update(req, res) {
    try {
      const val = await AttributeValueModel.update(req.params.id, req.body);
      if (!val) {
        return res.error(
          "Giá trị thuộc tính không tồn tại",
          "ATTRIBUTE_VALUE_NOT_FOUND",
          404
        );
      }
      return res.success(val, "Cập nhật giá trị thuộc tính thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi cập nhật giá trị thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async delete(req, res) {
    try {
      const val = await AttributeValueModel.delete(req.params.id);
      if (!val) {
        return res.error(
          "Giá trị thuộc tính không tồn tại",
          "ATTRIBUTE_VALUE_NOT_FOUND",
          404
        );
      }
      return res.success(null, "Xóa giá trị thuộc tính thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi xóa giá trị thuộc tính",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },
};
