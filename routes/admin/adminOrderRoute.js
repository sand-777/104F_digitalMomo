const catchAsync = require("../../Services/catchAsync");
const {
  getAllOrders,
  deleteOrder,
  updateOrderStatus,
  getSingleOrder,
} = require("../../controller/admin/order/orderController");
const isAuthenticated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = require("express").Router();

router
  .route("/")
  .get(isAuthenticated, restrictTo("admin"), catchAsync(getAllOrders));

router
  .route("/:id")
  .get(isAuthenticated, restrictTo("admin"), catchAsync(getSingleOrder))
  .patch(isAuthenticated, restrictTo("admin"), catchAsync(updateOrderStatus))
  .delete(isAuthenticated, restrictTo("admin"), catchAsync(deleteOrder));

  module.exports = router