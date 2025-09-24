// src/controllers/roleController.js
import { RoleModel } from "../models/roleModel.js";

export async function listRoles(req, res) {
  try {
    const roles = await RoleModel.all();
    return res.success(roles, "Lấy danh sách role thành công");
  } catch (err) {
    return res.error("Lỗi khi lấy danh sách role", "SERVER_ERROR", 500, err.message);
  }
}

export async function createRole(req, res) {
  try {
    const { code, name } = req.body;
    if (!code || !name) {
      return res.error("Thiếu code hoặc name", "VALIDATION_ERROR", 400);
    }
    const role = await RoleModel.create({ code, name });
    return res.success(role, "Tạo role thành công", 201);
  } catch (err) {
    return res.error("Lỗi khi tạo role", "SERVER_ERROR", 500, err.message);
  }
}

export async function patchRole(req, res) {
  try {
    const role = await RoleModel.update(req.params.id, req.body);
    if (!role) {
      return res.error("Không tìm thấy role", "ROLE_NOT_FOUND", 404);
    }
    return res.success(role, "Cập nhật role thành công");
  } catch (err) {
    return res.error("Lỗi khi cập nhật role", "SERVER_ERROR", 500, err.message);
  }
}

export async function deleteRole(req, res) {
  try {
    const role = await RoleModel.remove(req.params.id);
    if (!role) {
      return res.error("Không tìm thấy role", "ROLE_NOT_FOUND", 404);
    }
    return res.success(null, "Xóa role thành công");
  } catch (err) {
    return res.error("Lỗi khi xóa role", "SERVER_ERROR", 500, err.message);
  }
}

export async function assignRole(req, res) {
  try {
    const { userId } = req.params;
    const { role_id } = req.body;
    if (!role_id) {
      return res.error("Thiếu role_id", "VALIDATION_ERROR", 400);
    }
    const assigned = await RoleModel.assignRoleToUser(userId, role_id);
    return res.success(assigned, "Gán role cho user thành công", 201);
  } catch (err) {
    return res.error("Lỗi khi gán role", "SERVER_ERROR", 500, err.message);
  }
}
