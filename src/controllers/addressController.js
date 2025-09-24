// src/controllers/addressController.js
import { AddressModel } from "../models/addressModel.js";

export async function listAddresses(req, res) {
  try {
    const addrs = await AddressModel.listByUser(req.userId);
    return res.success(addrs, "Lấy danh sách địa chỉ thành công")
  } catch (err) {
    return res.error("Lỗi server khi lấy danh sách địa chỉ", "SERVER_ERROR", 500, err.message)
  }
}

export async function createAddress(req, res) {
  try {
    const payload = req.body;
    const addr = await AddressModel.create(req.userId, payload);
    return res.success(addr, "Tạo mới địa chỉ thành công")
  } catch (err) {
    return res.error("Lỗi server khi tạo mới địa chỉ", "SERVER_ERROR", 500, err.message)
  }
}

export async function patchAddress(req, res) {
  try {
    const updated = await AddressModel.update(req.params.id, req.userId, req.body);
    if (!updated) return res.error("Địa chỉ không tồn tại hoặc không thuộc sở hữu",
      "ADDRESS_NOT_FOUND_OR_UNAUTHORIZED",
      404);
    return res.success(updated, "Cập nhật địa chỉ thành công")
  } catch (err) {
    return res.error("Lỗi server khi cập nhật địa chỉ", "SERVER_ERROR", 500, err.message)
  }
}

export async function deleteAddress(req, res) {
  try {
    const removed = await AddressModel.remove(req.params.id, req.userId);
    if (!removed) {
      return res.error(
        "Địa chỉ không tồn tại hoặc không thuộc sở hữu",
        "ADDRESS_NOT_FOUND_OR_UNAUTHORIZED",
        404
      );
    } return res.success(removed, "Xóa địa chỉ thành công")
  } catch (err) {
    return res.error("Lỗi server khi xóa địa chỉ", "SERVER_ERROR", 500, err.message)
  }
}
