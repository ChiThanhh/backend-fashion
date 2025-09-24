import pool from "../config/db.js";

export const BrandModel = {
    async findAll() {
        const res = await pool.query("SELECT * FROM brands ORDER BY created_at DESC");
        return res.rows;
    },
    async findById(id) {
        const res = await pool.query("SELECT * FROM brands WHERE brand_id = $1", [id]);
        return res.rows[0];
    },
    async create({ name, slug }) {
        const res = await pool.query(
            "INSERT INTO brands (name, slug) VALUES ($1, $2) RETURNING *",
            [name, slug]
        );
        return res.rows[0];
    },

    async update(id, patch) {
        const fields = [];
        const values = [];
        let idx = 1;
        for (const key of ["name", "slug"]) {
            if (patch[key] !== undefined) {
                fields.push(`${key} = $${idx}`);
                values.push(patch[key]);
                idx++;
            }
        }
        if (fields.length === 0) return this.findById(id);
        values.push(id);
        const q = `UPDATE brands SET ${fields.join(", ")}, updated_at = now() WHERE brand_id = $${idx} RETURNING *`;
        const res = await pool.query(q, values);
        return res.rows[0];
    },

    async delete(id) {
        const res = await pool.query("DELETE FROM brands WHERE brand_id = $1 RETURNING *", [id]);
        return res.rows[0] || null;
    }
}