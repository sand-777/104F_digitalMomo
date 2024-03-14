const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
} = require("../controller/admin/product/productController");
const isAuthenticated = require("../middleware/isAuthenticated");
const restrictTo = require("../middleware/restrictTo");

const router = require("express").Router();
const { multer, storage } = require("../middleware/multerConfig");
const catchAsync = require("../Services/catchAsync");
const upload = multer({ storage: storage });

router
  .route("/products")
  .post(
    isAuthenticated,
    restrictTo("admin", "super-admin"),
    upload.single("productImage"),
    catchAsync(createProduct)
  )
  .get(catchAsync(getProducts));

router
  .route("/products/:id")
  .get(catchAsync(getProduct))
  .delete(isAuthenticated, restrictTo("admin"), catchAsync(deleteProduct)).patch(isAuthenticated,restrictTo("admin"),upload.single("productImage"),catchAsync(editProduct));

module.exports = router;
