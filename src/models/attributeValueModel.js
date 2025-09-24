import pool from "../config/db.js";

export const AttributeValueModel = {
  async findAll() {
    const res = await pool.query(`
      SELECT 
        av.value_id,
        av.value,
        av.sort_order,
        av.created_at,
        av.updated_at,
        av.attribute_id,
        a.name AS attribute_name
      FROM attribute_values av
      JOIN attributes a 
        ON av.attribute_id = a.attribute_id
      ORDER BY av.created_at DESC
    `); return res.rows;
  },

  async findById(id) {
    const res = await pool.query("SELECT * FROM attribute_values WHERE value_id = $1", [id]);
    return res.rows[0];
  },

  async findByAttributeId(attribute_id) {
    const res = await pool.query(
      `SELECT *
     FROM attribute_values av
     JOIN attributes a 
       ON av.attribute_id = a.attribute_id
     WHERE av.attribute_id = $1
     ORDER BY av.sort_order ASC, av.created_at DESC`,
      [attribute_id]
    );
    return res.rows;
  },


  async create({ attribute_id, value, sort_order }) {
    const res = await pool.query(
      "INSERT INTO attribute_values (attribute_id, value,sort_order) VALUES ($1, $2,$3) RETURNING *",
      [attribute_id, value, sort_order]
    );
    return res.rows[0];
  },

    async update(id, patch) {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key of ["value", "attribute_id", "sort_order"]) {
    if (patch[key] !== undefined) {
      fields.push(`${key} = $${idx}`);
      values.push(patch[key]);
      idx++;
    }
  }

  if (fields.length === 0) return this.findById(id);

  values.push(id);
  const q = `UPDATE attribute_values SET ${fields.join(", ")}, updated_at = now() WHERE value_id = $${idx} RETURNING *`;
  const res = await pool.query(q, values);
  return res.rows[0];
},

  async delete (id) {
  const res = await pool.query("DELETE FROM attribute_values WHERE value_id = $1 RETURNING *", [id]);
  return res.rows[0] || null;
}
};
