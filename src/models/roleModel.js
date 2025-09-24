import pool from "../config/db.js";

export const RoleModel = {
    async all() {
        const res = await pool.query("SELECT * FROM roles ORDER BY name");
        return res.rows;
    },
    async create({ code, name }) {
        const res = await pool.query("INSERT INTO roles (code, name) VALUES ($1, $2) RETURNING *", [code, name]);
        return res.rows[0];
    },
    async findById(id) {
        const res = await pool.query("SELECT * FROM roles WHERE role_id = $1", [id])
        return res.rows[0];
    },
    async update(id, patch) {
        const res = await pool.query("UPDATE roles SET code = COALESCE($1, code), name = COALESCE($2, name) WHERE role_id = $3 RETURNING *", [patch.code, patch.name, id]);
        return res.rows[0];
    },
    async remove(id) {
        const res = await pool.query("DELETE FROM roles WHERE role_id = $1 RETURNING *", [id]);
        return res.rows[0];
    },


}