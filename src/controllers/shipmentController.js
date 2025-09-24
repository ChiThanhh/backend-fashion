// src/controllers/shipmentController.js
import { ShipmentModel } from "../models/shipmentModel.js";
import { ShipmentItemModel } from "../models/shipmentItemModel.js";

export const ShipmentController = {
  async getAll(req, res) {
    try {
      const shipments = await ShipmentModel.findAll();
      return res.success(shipments, "Lấy danh sách shipment thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy danh sách shipment", "SERVER_ERROR", 500, err.message);
    }
  },

  async getById(req, res) {
    try {
      const shipment = await ShipmentModel.findById(req.params.id);
      if (!shipment) return res.error("Không tìm thấy shipment", "SHIPMENT_NOT_FOUND", 404);

      const items = await ShipmentItemModel.findByShipment(req.params.id);
      return res.success({ ...shipment, items }, "Lấy shipment thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy shipment", "SERVER_ERROR", 500, err.message);
    }
  },

  async getByOrder(req, res) {
    try {
      const shipments = await ShipmentModel.findByOrder(req.params.orderId);
      return res.success(shipments, "Lấy danh sách shipment theo order thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi lấy shipment theo order", "SERVER_ERROR", 500, err.message);
    }
  },

  async create(req, res) {
    try {
      // Expect: { order_id, carrier, tracking_number, status, shipped_at?, delivered_at?, metadata?, items: [{ order_item_id, quantity }] }
      const { items = [], ...shipmentData } = req.body;
      const shipment = await ShipmentModel.create(shipmentData);

      const shipmentItems = [];
      for (const item of items) {
        const si = await ShipmentItemModel.create({
          shipment_id: shipment.shipment_id,
          order_item_id: item.order_item_id,
          quantity: item.quantity
        });
        shipmentItems.push(si);
      }

      return res.success(
        { ...shipment, items: shipmentItems },
        "Tạo shipment thành công",
        201
      );
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi tạo shipment", "SERVER_ERROR", 500, err.message);
    }
  },

  async update(req, res) {
    try {
      const shipment = await ShipmentModel.update(req.params.id, req.body);
      if (!shipment) return res.error("Không tìm thấy shipment", "SHIPMENT_NOT_FOUND", 404);
      return res.success(shipment, "Cập nhật shipment thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi cập nhật shipment", "SERVER_ERROR", 500, err.message);
    }
  },

  async delete(req, res) {
    try {
      const shipment = await ShipmentModel.delete(req.params.id);
      if (!shipment) return res.error("Không tìm thấy shipment", "SHIPMENT_NOT_FOUND", 404);
      return res.success(null, "Xóa shipment thành công");
    } catch (err) {
      console.error(err);
      return res.error("Lỗi khi xóa shipment", "SERVER_ERROR", 500, err.message);
    }
  }
};
