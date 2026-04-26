// models/productModel.js
const pool = require("../config/db");

// CREATE
async function create({ name, description, price, stock }) {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, stock)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [name, description ?? null, price, stock ?? 0]
  );

  return result.rows[0];
}

// GET ALL
async function findAll(limit, offset) {
  return pool.query(
    `SELECT * FROM products
     ORDER BY id DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
}

// COUNT
async function countAll() {
  return pool.query(`SELECT COUNT(*) FROM products`);
}

// GET ONE
async function findById(id) {
  const result = await pool.query(
    `SELECT * FROM products WHERE id = $1`,
    [id]
  );

  return result.rows[0] || null;
}

// UPDATE
async function update(id, { name, description, price, stock }) {
  const result = await pool.query(
    `UPDATE products
     SET name=$1, description=$2, price=$3, stock=$4
     WHERE id=$5
     RETURNING *`,
    [name, description ?? null, price, stock ?? 0, id]
  );

  return result.rows[0] || null;
}

// DELETE
async function remove(id) {
  const result = await pool.query(
    `DELETE FROM products WHERE id=$1 RETURNING *`,
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  create,
  findAll,
  countAll,
  findById,
  update,
  remove,
};