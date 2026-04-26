const service = require("../services/productService");

// CREATE
async function create(req, res) {
  try {
    const product = await service.createProduct(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// GET ALL
async function getAll(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await service.getAllProducts({ page, limit });
    return res.json({ success: true, ...result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// GET ONE
async function getOne(req, res) {
  try {
    const product = await service.getProductById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, data: product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// UPDATE
async function update(req, res) {
  try {
    const updated = await service.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

// DELETE
async function remove(req, res) {
  try {
    const deleted = await service.deleteProduct(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};