// Validate ID param
function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  req.params.id = id;
  next();
}

// Validate body for create/update
function validateProduct(req, res, next) {
  const { name, description, price, stock } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Name is required (min 2 chars)",
    });
  }

  if (price === undefined || price === null || isNaN(price)) {
    return res.status(400).json({
      success: false,
      message: "Valid price is required",
    });
  }

  const numPrice = Number(price);
  if (numPrice < 0) {
    return res.status(400).json({
      success: false,
      message: "Price cannot be negative",
    });
  }

  if (stock !== undefined && (isNaN(stock) || Number(stock) < 0)) {
    return res.status(400).json({
      success: false,
      message: "Stock must be a non-negative number",
    });
  }

  // sanitize
  req.body.name = name.trim();
  req.body.description =
    typeof description === "string" ? description.trim() : null;
  req.body.price = numPrice;
  req.body.stock = stock === undefined ? 0 : Number(stock);

  next();
}

module.exports = {
  validateProduct,
  validateId,
};