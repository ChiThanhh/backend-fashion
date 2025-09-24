import { ProductModel } from "../models/productModel.js";

export const ProductController = {
  async getAll(req, res) {
    try {
      const products = await ProductModel.findAll();
      return res.success(products, "Lấy danh sách sản phẩm thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) return res.error("Không tìm thấy sản phẩm", "PRODUCT_NOT_FOUND", 404);
      return res.success(product, "Lấy thông tin sản phẩm thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy thông tin sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const product = await ProductModel.create(req.body);
      return res.success(product, "Tạo sản phẩm thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const product = await ProductModel.update(req.params.id, req.body);
      if (!product) return res.error("Không tìm thấy sản phẩm", "PRODUCT_NOT_FOUND", 404);
      return res.success(product, "Cập nhật sản phẩm thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const product = await ProductModel.delete(req.params.id);
      if (!product) return res.error("Không tìm thấy sản phẩm", "PRODUCT_NOT_FOUND", 404);
      return res.success(null, "Xóa sản phẩm thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa sản phẩm", "SERVER_ERROR", 500, err.message);
    }
  }
};
