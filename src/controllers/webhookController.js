// src/controllers/webhookController.js
import { WebhookModel } from "../models/webhookModel.js";

export const WebhookController = {
  async getAll(req, res) {
    try {
      const hooks = await WebhookModel.findAll();
      return res.success(hooks, "Lấy danh sách webhook thành công!");
    } catch (err) {
      console.error(err);
      return res.error(
        "Lỗi khi lấy danh sách webhook",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async getById(req, res) {
    try {
      const hook = await WebhookModel.findById(req.params.id);
      if (!hook) {
        return res.error("Không tìm thấy webhook!", "WEBHOOK_NOT_FOUND", 404);
      }
      return res.success(hook, "Lấy webhook thành công!");
    } catch (err) {
      console.error(err);
      return res.error(
        "Lỗi khi lấy webhook",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  }
};
