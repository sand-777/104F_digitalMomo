const catchAsync = require("../../Services/catchAsync")
const { getAllOrders } = require("../../controller/admin/order/orderController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")

const router = require("express").Router()


router.route("/orders").get(isAuthenticated,restrictTo("admin"), catchAsync(getAllOrders))

module.exports = router