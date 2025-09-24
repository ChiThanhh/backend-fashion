// src/controllers/auditLogController.js
import { AuditLogModel } from "../models/auditLogModel.js";

export const AuditLogController = {
  async getAll(req, res) {
    try {
      const logs = await AuditLogModel.findAll();
      return res.success(logs, "Lấy danh sách audit logs thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi lấy danh sách audit logs",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },

  async getById(req, res) {
    try {
      const log = await AuditLogModel.findById(req.params.id);
      if (!log) {
        return res.error(
          "Audit log không tồn tại",
          "AUDIT_LOG_NOT_FOUND",
          404
        );
      }
      return res.success(log, "Lấy audit log thành công");
    } catch (err) {
      return res.error(
        "Lỗi server khi lấy audit log",
        "SERVER_ERROR",
        500,
        err.message
      );
    }
  },
};
