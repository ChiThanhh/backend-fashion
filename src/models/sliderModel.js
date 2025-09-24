import pool from "../config/db.js";

export const Slider = {
    async findAll() {
        const res = await pool.query(`SELECT * FROM sliders`);
        return res.rows;
    },
    async findById(id) {
        const res = await pool.query(`SELECT * FROM sliders WHERE slider_id = $1`, [id]);
        return res.rows[0];
    },
    async create({ title, description, img_url, sort_order }) {
        const res = await pool.query(`INSERT INTO sliders (title, description, img_url, sort_order) VALUES ($1, $2, $3, $4) RETURNING *`, [title, description, img_url, sort_order]);
        return res.rows[0];
    },
    async update(id, patch) {
        const fields = [];
        const values = [];
        let idx = 1;
        for (const key of ["title", "description", "img_url", "sort_order"]) {
            if (patch[key] !== undefined) {
                fields.push(`${key} = $${idx}`);
                values.push(patch[key]);
                idx++;
            }
        }
        if (fields.length === 0) return this.findById(id);
        values.push(id);
        const q = `UPDATE sliders SET ${fields.join(", ")}, updated_at = now() WHERE slider_id = $${idx} RETURNING *`
        const res = await pool.query(q, values);
        return res.rows[0];
    },
    async delete(id) {
        const res = await pool.query(`DELETE FROM sliders WHERE slider_id = $1 RETURNING *`, [id]);
        return res.rows[0];
    }
}