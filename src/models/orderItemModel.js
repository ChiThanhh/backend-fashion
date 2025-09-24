import pool from "../config/db.js";

export const OrderItemModel = {
    async findAll() {
        const res = await pool.query("SELECT * FROM order_items ORDER BY order_item_id DESC");
        return res.rows;
    },

    async findById(id) {
        const res = await pool.query("SELECT * FROM order_items WHERE order_item_id = $1", [id]);
        return res.rows[0];
    },

    async findByOrder(orderId) {
        const res = await pool.query("SELECT * FROM order_items WHERE order_id = $1", [orderId]);
        return res.rows;
    },

    async create({ order_id, product_id, variant_id, sku, name, color, size, qty, unit_price, discount_amount = 0, tax_amount = 0, total_amount }) {
        const res = await pool.query(
            `INSERT INTO order_items 
            (order_id, product_id, variant_id, sku, name, color, size, qty, unit_price, discount_amount, tax_amount, total_amount)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
            RETURNING *`,
            [order_id, product_id, variant_id, sku, name, color, size, qty, unit_price, discount_amount, tax_amount, total_amount]
        );
        return res.rows[0];
    },

    async update(id, patch) {
        const fields = [];
        const values = [];
        let idx = 1;

        for (const key of ["qty", "unit_price", "discount_amount", "tax_amount", "total_amount"]) {
            if (patch[key] !== undefined) {
                fields.push(`${key} = $${idx}`);
                values.push(patch[key]);
                idx++;
            }
        }
        if (fields.length === 0) return this.findById(id);

        values.push(id);
        const q = `UPDATE order_items SET ${fields.join(", ")}, updated_at = now() WHERE order_item_id = $${idx} RETURNING *`;
        const res = await pool.query(q, values);
        return res.rows[0];
    },

    async delete(id) {
        const res = await pool.query("DELETE FROM order_items WHERE order_item_id = $1 RETURNING *", [id]);
        return res.rows[0] || null;
    }
};
