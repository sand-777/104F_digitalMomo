const { createProduct } = require("../controller/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restrictTo = require("../middleware/restrictTo");

router = require("express").Router();

router.route("/createProduct").post(isAuthenticated,restrictTo("admin","super-admin"), createProduct)

module.exports = router