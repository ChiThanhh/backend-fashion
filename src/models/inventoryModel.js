import pool from "../config/db.js";

const inventorySelectQuery = `
  SELECT i.*,
         json_build_object(
            'id', w.warehouse_id,
            'name', w.name
         ) AS warehouse,
         json_build_object(
            'id', v.variant_id,
            'sku', v.sku,
            'barcode', v.barcode
         ) AS variant,
         json_build_object(
            'id', p.product_id,
            'name', p.name
         ) AS product
  FROM inventory i
  LEFT JOIN warehouses w ON w.warehouse_id = i.warehouse_id
  LEFT JOIN product_variants v ON v.variant_id = i.variant_id
  LEFT JOIN products p ON p.product_id = v.product_id
`;

export const InventoryModel = {
  async findAll() {
    const res = await pool.query(`${inventorySelectQuery} ORDER BY i.created_at DESC`);
    return res.rows;
  },

  async findById(variant_id, warehouse_id) {
    const res = await pool.query(
      `SELECT i.*, 
            p.name AS product_name, 
            v.sku AS variant_sku, 
            w.name AS warehouse_name
     FROM inventory i
     JOIN product_variants v ON v.variant_id = i.variant_id
     JOIN products p ON p.product_id = v.product_id
     JOIN warehouses w ON w.warehouse_id = i.warehouse_id
     WHERE i.variant_id = $1 AND i.warehouse_id = $2`,
      [variant_id, warehouse_id]
    );
    return res.rows[0];
  },

//not
  async create({ variant_id, warehouse_id, quantity }) {
    const res = await pool.query(
      `INSERT INTO inventory (variant_id, warehouse_id, quantity) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [variant_id, warehouse_id, quantity]
    );
    return this.findById(res.rows[0].inventory_id);
  },

  async update({ variant_id, warehouse_id, patch }) {
    const fields = [];
    const values = [];
    let idx = 1;

    for (const key of ["available_qty", "reserved_qty"]) {
      if (patch[key] !== undefined) {
        fields.push(`${key} = $${idx}`);
        values.push(patch[key]);
        idx++;
      }
    }

    if (fields.length === 0) {
      return this.findById(variant_id, warehouse_id);
    }

    values.push(variant_id);
    values.push(warehouse_id);

    const q = `
    UPDATE inventory 
    SET ${fields.join(", ")}, updated_at = now() 
    WHERE variant_id = $${idx} AND warehouse_id = $${idx + 1}
    RETURNING *
  `;
    const res = await pool.query(q, values);

    return this.findById(variant_id, warehouse_id);
  },

  //not
  async delete(id) {
    const res = await pool.query(
      "DELETE FROM inventory WHERE inventory_id = $1 RETURNING *",
      [id]
    );
    return res.rows[0] || null;
  }
};
