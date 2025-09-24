import { InventoryModel } from "../models/inventoryModel.js";

export const InventoryController = {
  async getAll(req, res) {
    try {
      const list = await InventoryModel.findAll();
      return res.success(list, "Lấy danh sách kho thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách kho", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const item = await InventoryModel.findById(req.params.id);
      if (!item) return res.error("Không tìm thấy kho", "INVENTORY_NOT_FOUND", 404);
      return res.success(item, "Lấy thông tin kho thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy thông tin kho", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      const item = await InventoryModel.create(req.body);
      return res.success(item, "Tạo kho thành công", 201);
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo kho", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const { variantId, warehouseId } = req.params;
      const data = await InventoryModel.update({
        variant_id: variantId,
        warehouse_id: warehouseId,
        patch: req.body
      });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },


  async delete(req, res) {
    try {
      const item = await InventoryModel.delete(req.params.id);
      if (!item) return res.error("Không tìm thấy kho", "INVENTORY_NOT_FOUND", 404);
      return res.success(null, "Xóa kho thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa kho", "SERVER_ERROR", 500, err.message);
    }
  }
};
