// src/controllers/userController.js
import { UserModel } from "../models/userModel.js";
import { RoleModel } from "../models/roleModel.js";

// Lấy thông tin user hiện tại (me)
export async function getMe(req, res) {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.error("Không tìm thấy user!", "USER_NOT_FOUND", 404);
    }
    return res.success(user, "Lấy thông tin user thành công!");
  } catch (err) {
    return res.error("Lỗi khi lấy thông tin user", "SERVER_ERROR", 500, err.message);
  }
}

// Cập nhật thông tin user hiện tại (me)
export async function patchMe(req, res) {
  try {
    const payload = {};
    if (req.body.full_name) payload.full_name = req.body.full_name;
    if (req.body.phone) payload.phone = req.body.phone;
    if (req.body.password) {
      const bcrypt = await import("bcrypt");
      payload.password_hash = await bcrypt.hash(req.body.password, 10);
    }

    const user = await UserModel.update(req.userId, payload);
    if (!user) {
      return res.error("Không tìm thấy user!", "USER_NOT_FOUND", 404);
    }
    return res.success(user, "Cập nhật thông tin thành công!");
  } catch (err) {
    return res.error("Lỗi khi cập nhật thông tin", "SERVER_ERROR", 500, err.message);
  }
}

// Admin: Lấy user theo ID
export async function getUserById(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.error("Không tìm thấy user!", "USER_NOT_FOUND", 404);
    }
    return res.success({ ...user }, "Lấy thông tin user thành công!");
  } catch (err) {
    return res.error("Lỗi khi lấy user theo ID", "SERVER_ERROR", 500, err.message);
  }
}

// Admin: Cập nhật user theo ID
export async function patchUserById(req, res) {
  try {
    const payload = {};
    if (req.body.full_name) payload.full_name = req.body.full_name;
    if (req.body.email) payload.email = req.body.email;
    if (req.body.password) {
      const bcrypt = await import("bcrypt");
      payload.password_hash = await bcrypt.hash(req.body.password, 10);
    }
    if (req.body.is_active !== undefined) payload.is_active = req.body.is_active;

    const user = await UserModel.update(req.params.id, payload);
    if (!user) {
      return res.error("Không tìm thấy user!", "USER_NOT_FOUND", 404);
    }
    return res.success(user, "Cập nhật user thành công!");
  } catch (err) {
    return res.error("Lỗi khi cập nhật user", "SERVER_ERROR", 500, err.message);
  }
}

// Admin: Xóa user theo ID
export async function deleteUserById(req, res) {
  try {
    const user = await UserModel.delete(req.params.id);
    if (!user) {
      return res.error("Không tìm thấy user!", "USER_NOT_FOUND", 404);
    }
    return res.success(null, "Xóa user thành công!");
  } catch (err) {
    return res.error("Lỗi khi xóa user", "SERVER_ERROR", 500, err.message);
  }
}
