// src/controllers/warehouseController.js
import { WarehouseModel } from "../models/warehouseModel.js";

export const WarehouseController = {
  async getAll(req, res) {
    try {
      const list = await WarehouseModel.findAll();
      return res.success(list, "Lấy danh sách kho thành công!");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách kho", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const warehouse = await WarehouseModel.findById(req.params.id);
      if (!warehouse) {
        return res.error("Không tìm thấy kho!", "WAREHOUSE_NOT_FOUND", 404);
      }
      return res.success(warehouse, "Lấy thông tin kho thành công!");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy thông tin kho", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const warehouse = await WarehouseModel.create(req.body);
      return res.success(warehouse, "Tạo kho thành công!", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo kho", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const warehouse = await WarehouseModel.update(req.params.id, req.body);
      if (!warehouse) {
        return res.error("Không tìm thấy kho!", "WAREHOUSE_NOT_FOUND", 404);
      }
      return res.success(warehouse, "Cập nhật kho thành công!");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật kho", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const warehouse = await WarehouseModel.delete(req.params.id);
      if (!warehouse) {
        return res.error("Không tìm thấy kho!", "WAREHOUSE_NOT_FOUND", 404);
      }
      return res.success(null, "Xóa kho thành công!");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa kho", "SERVER_ERROR", 500, err.message);
    }
  }
};
