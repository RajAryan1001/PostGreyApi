const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController");
const { validateProduct, validateId } = require("../middlewares/validate");

// CREATE
router.post("/", validateProduct, controller.create);

// READ
router.get("/", controller.getAll);
router.get("/:id", validateId, controller.getOne);

// UPDATE
router.put("/:id", validateId, validateProduct, controller.update);

// DELETE
router.delete("/:id", validateId, controller.remove);

module.exports = router;