// src/controllers/variantController.js
import { VariantModel } from "../models/variantModel.js";

export const VariantController = {
  async getAll(req, res) {
    try {
      const variants = await VariantModel.findAll();
      return res.success(variants, "Lấy danh sách biến thể sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách biến thể sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const variant = await VariantModel.findById(req.params.id);
      if (!variant) {
        return res.error("Không tìm thấy biến thể sản phẩm!", "VARIANT_NOT_FOUND", 404);
      }
      return res.success(variant, "Lấy thông tin biến thể sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy biến thể sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },
  async getVariantByProduct(req, res) {
    try {
      const variants = await VariantModel.findByProductId(req.params.id);

      if (!variants || variants.length === 0) {
        return res.error(
          "Không tìm thấy biến thể sản phẩm!",
          "VARIANT_NOT_FOUND",
          404
        );
      }

      return res.success(variants, "Lấy thông tin biến thể sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      return res.error(
        "Lỗi khi lấy biến thể sản phẩm",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },


  async create(req, res) {
    try {
      const variant = await VariantModel.create(req.body);
      return res.success(variant, "Tạo biến thể sản phẩm thành công!", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo biến thể sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const variant = await VariantModel.update(req.params.id, req.body);
      if (!variant) {
        return res.error("Không tìm thấy biến thể sản phẩm!", "VARIANT_NOT_FOUND", 404);
      }
      return res.success(variant, "Cập nhật biến thể sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật biến thể sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const variant = await VariantModel.delete(req.params.id);
      if (!variant) {
        return res.error("Không tìm thấy biến thể sản phẩm!", "VARIANT_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa biến thể sản phẩm thành công!");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa biến thể sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },
  async bulkCreate(req, res) {
    try {
      const { product_id, variants } = req.body;

      if (!product_id || !Array.isArray(variants) || variants.length === 0) {
        return res.error("Invalid payload!", "VARIANT_NOT_FOUND", 400);
      }

      const createdVariants = await VariantModel.bulkCreate(product_id, variants);

      return res.success(createdVariants, "Tạo biến thể sản phẩm thành công!", 201);

    } catch (err) {
      console.error("bulkCreate error:", err);
      return res.error("Lỗi khi tạo biến thể sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },
  async bulkUpdate(req, res) {
    try {
      const { product_id, variants } = req.body;

      if (!product_id || !Array.isArray(variants) || variants.length === 0) {
        return res.error("Invalid payload!", "VARIANT_NOT_FOUND", 400);
      }

      const updatedVariants = await VariantModel.bulkUpdate(product_id, variants);

      return res.success(updatedVariants, "Cập nhật biến thể sản phẩm thành công!", 200);

    } catch (err) {
      console.error("bulkUpdate error:", err);
      return res.error("Lỗi khi cập nhật biến thể sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  }

};
