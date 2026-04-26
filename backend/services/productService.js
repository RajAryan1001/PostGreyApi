const productModel = require("../models/productModel");

// CREATE
async function createProduct(data) {
  return await productModel.create(data);
}

// GET ALL
async function getAllProducts({ page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;

  const [dataRes, countRes] = await Promise.all([
    productModel.findAll(limit, offset),
    productModel.countAll(),
  ]);

  return {
    items: dataRes.rows,
    total: parseInt(countRes.rows[0].count, 10),
    page,
    limit,
  };
}

// GET ONE
async function getProductById(id) {
  return await productModel.findById(id);
}

// UPDATE
async function updateProduct(id, data) {
  return await productModel.update(id, data);
}

// DELETE
async function deleteProduct(id) {
  return await productModel.remove(id);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};