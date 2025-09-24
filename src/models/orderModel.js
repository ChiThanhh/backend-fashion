import pool from "../config/db.js";

export const OrderModel = {
    async findAll() {
        const res = await pool.query("SELECT * FROM orders ORDER BY placed_at DESC");
        return res.rows;
    },

    async findById(id) {
        const res = await pool.query("SELECT * FROM orders WHERE order_id = $1", [id]);
        return res.rows[0];
    },

    async create({ user_id, status, currency, subtotal, discount_total = 0, shipping_fee = 0, tax_total = 0, grand_total, shipping_address, billing_address, note, coupon_code, promo_snapshot }) {
        const res = await pool.query(
            `INSERT INTO orders 
            (user_id, status, currency, subtotal, discount_total, shipping_fee, tax_total, grand_total, shipping_address, billing_address, note, coupon_code, promo_snapshot) 
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) 
            RETURNING *`,
            [user_id, status, currency, subtotal, discount_total, shipping_fee, tax_total, grand_total, shipping_address, billing_address, note, coupon_code, promo_snapshot]
        );
        return res.rows[0];
    },

    async update(id, patch) {
        const fields = [];
        const values = [];
        let idx = 1;

        for (const key of ["status", "note", "coupon_code", "promo_snapshot"]) {
            if (patch[key] !== undefined) {
                fields.push(`${key} = $${idx}`);
                values.push(patch[key]);
                idx++;
            }
        }
        if (fields.length === 0) return this.findById(id);

        values.push(id);
        const q = `UPDATE orders SET ${fields.join(", ")}, updated_at = now() WHERE order_id = $${idx} RETURNING *`;
        const res = await pool.query(q, values);
        return res.rows[0];
    },

    async delete(id) {
        const res = await pool.query("DELETE FROM orders WHERE order_id = $1 RETURNING *", [id]);
        return res.rows[0] || null;
    }
};
