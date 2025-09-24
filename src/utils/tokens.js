import jwt from "jsonwebtoken";
import pool from "../config/db.js"
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES;
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES;

//tạo hàm access token
export function signAccessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
}
//hàm refresh token
export function signRefreshToken(payload) {
    const jti = uuidv4();
    const token = jwt.sign({ ...payload, jti }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
    return { token, jti };
}
//hàm lưu refresh token
export async function saveRefreshToken(userId, token, jti) {
    const q = `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2) RETURNING *`;
    const res = await pool.query(q,[userId, token]);
    return res.rows[0];
}
//hàm thu hồi token
//Thao tác này rất quan trọng khi người dùng đăng xuất hoặc khi phát hiện một token bị xâm nhập, giúp ngăn chặn việc sử dụng token đó trong tương lai.
export async function revokeRefreshToken(token) {
    const q = `UPDATE refresh_tokens SET revoked = true, revoked_at = now() WHERE token = $1 RETURNING *`;
    const res = await pool.query(q, [token]);
    return res.rows[0];
}
//hàm tìm token
//Hàm này dùng để kiểm tra sự tồn tại của một refresh token trong cơ sở dữ liệu.
export async function findRefreshToken(token){
    const q = `SELECT * FROM refresh_tokens WHERE token = $1`;
    const res = await pool.query(q,[token]);
    return res.rows[0];
}
