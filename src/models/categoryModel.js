import pool from "../config/db.js";

export const CategoryModel = {
  async findAll() {
    const q = `
      SELECT c.*,
             p.name AS parent_name
      FROM categories c
      LEFT JOIN categories p ON c.parent_id = p.category_id
      ORDER BY c.sort_order ASC, c.created_at DESC
    `;
    const res = await pool.query(q);
    return res.rows;
  },


  async findById(id) {
    const res = await pool.query("SELECT * FROM categories WHERE category_id = $1", [id]);
    return res.rows[0] || null;
  },

  async create({ name, slug, parent_id, sort_order, level }) {
    const q = `INSERT INTO categories (name, slug, parent_id, sort_order,level) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const res = await pool.query(q, [name, slug, parent_id || null, sort_order || 0, level]);
    return res.rows[0];
  },

  async update(id, patch) {
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key of ["name", "slug", "parent_id", "sort_order", "level"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }
    if (fields.length === 0) return this.findById(id);
    values.push(id);
    const q = `UPDATE categories SET ${fields.join(", ")}, updated_at = now() WHERE category_id = $${idx} RETURNING *`;
    const res = await pool.query(q, values);
    return res.rows[0];
  },

  async delete(id) {
    const res = await pool.query("DELETE FROM categories WHERE category_id = $1 RETURNING *", [id]);
    return res.rows[0] || null;
  },
};
