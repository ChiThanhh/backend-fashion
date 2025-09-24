import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";
import {
  signAccessToken,
  signRefreshToken,
  saveRefreshToken,
  revokeRefreshToken,
  findRefreshToken,
} from "../utils/tokens.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

// Đăng ký
export async function register(req, res) {
  try {
    const { email, password, full_name } = req.body;
    if (!email || !password) {
      return res.error("Email và mật khẩu là bắt buộc", "VALIDATION_ERROR", 400);
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return res.error("Email đã tồn tại", "EMAIL_ALREADY_EXISTS", 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, passwordHash, full_name });

    return res.success(user, "Đăng ký người dùng thành công", 201);
  } catch (err) {
    console.error(err);
    return res.error("Lỗi server khi đăng ký", "SERVER_ERROR", 500, err.message);
  }
}

// Đăng nhập
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.error("Email và mật khẩu là bắt buộc", "VALIDATION_ERROR", 400);
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.error("Người dùng không tồn tại", "USER_NOT_FOUND", 404);
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.error("Thông tin đăng nhập không hợp lệ", "INVALID_CREDENTIALS", 401);
    }
    const accessToken = signAccessToken({ userId: user.user_id});
    const { token: refreshToken } = signRefreshToken({ userId: user.user_id });

    // lưu refresh token vào database
    await saveRefreshToken(user.user_id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      // secure: true, // bật khi chạy prod HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 ngày
      sameSite: "lax",
    });

    return res.success({
      accessToken, user
    }, "Đăng nhập thành công");
  } catch (err) {
    console.error(err);
    return res.error("Lỗi server khi đăng nhập", "SERVER_ERROR", 500, err.message);
  }
}

// Đăng xuất
export async function logout(req, res) {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (token) {
      await revokeRefreshToken(token);
      res.clearCookie("refreshToken");
    }
    return res.success(null, "Đăng xuất thành công");
  } catch (err) {
    console.error(err);
    return res.error("Lỗi server khi đăng xuất", "SERVER_ERROR", 500, err.message);
  }
}

// Refresh token
export async function refreshTokenHandler(req, res) {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!token) {
      return res.error("Thiếu refresh token", "MISSING_REFRESH_TOKEN", 401);
    }

    // check DB
    const dbTok = await findRefreshToken(token);
    if (!dbTok || dbTok.revoked) {
      return res.error("Refresh token không hợp lệ", "INVALID_REFRESH_TOKEN", 401);
    }

    // verify signature
    let payload;
    try {
      payload = jwt.verify(token, REFRESH_SECRET);
    } catch (err) {
      return res.error("Refresh token không hợp lệ", "INVALID_REFRESH_TOKEN", 401);
    }

    const userId = payload.userId;
    const accessToken = signAccessToken({ userId });

    // ở đây em giữ nguyên refresh token, nếu muốn rotate có thể cấp token mới
    return res.success({ accessToken }, "Refresh token thành công");
  } catch (err) {
    console.error(err);
    return res.error("Lỗi server khi refresh token", "SERVER_ERROR", 500, err.message);
  }
}
