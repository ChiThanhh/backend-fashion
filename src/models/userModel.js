import pool from "../config/db.js"
export const UserModel = {
    async findByEmail(email) {
        const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return res.rows[0] || null;
    },
    async create({ email, passwordHash, full_name }) {
        const q = `INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING *`;
        const res = await pool.query(q, [email, passwordHash, full_name || null]);
        return res.rows[0] || null;
    },
    async findById(userId) {
        const res = await pool.query("SELECT * FROM users WHERE user_id = $1", [userId]);
        return res.rows[0];
    },
    async update(userId, patch) {
        const fields = [];
        const values = [];
        let idx = 1;
        for (const key of ["email", "full_name", "phone", "is_active", "is_email_verified", "password_hash"]) {
            if (patch[key] !== undefined) {
                fields.push(`${key} = $${idx}`);
                values.push(patch[key]);
                idx++;
            }
        }
        if (fields.length === 0) return this.findById(userId);
        values.push(userId);
        const q = `UPDATE users SET ${fields.join(", ")}, updated_at = now() WHERE user_id = $${idx} RETURNING *`;
        const res = await pool.query(q, values);
        return res.rows[0];
    },
    async delete(userId) {
        const res = await pool.query("DELETE FROM users WHERE user_id = $1 RETURNING *", [userId]);
        return res.rows[0];
    },
    
};