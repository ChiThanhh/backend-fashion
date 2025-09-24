import { ImageModel } from "../models/imageModel.js";

export const ImageController = {
  async getAll(req, res) {
    try {
      const images = await ImageModel.findAll();
      return res.success(images, "Lấy danh sách hình ảnh thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy danh sách hình ảnh", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const image = await ImageModel.findById(req.params.id);
      if (!image) {
        return res.error("Không tìm thấy hình ảnh", "IMAGE_NOT_FOUND", 404);
      }
      return res.success(image, "Lấy hình ảnh thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi lấy hình ảnh", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const image = await ImageModel.create(req.body);
      return res.success(image, "Tạo hình ảnh thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi tạo hình ảnh", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const image = await ImageModel.update(req.params.id, req.body);
      if (!image) {
        return res.error("Không tìm thấy hình ảnh", "IMAGE_NOT_FOUND", 404);
      }
      return res.success(image, "Cập nhật hình ảnh thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi cập nhật hình ảnh", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const image = await ImageModel.delete(req.params.id);
      if (!image) {
        return res.error("Không tìm thấy hình ảnh", "IMAGE_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa hình ảnh thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi server khi xóa hình ảnh", "SERVER_ERROR", 500, err.message);
    }
  }
};
