const catchAsync = require("../../Services/catchAsync")
const { createOrder, getMyOrders } = require("../../controller/order/orderController")
const isAuthenticated = require("../../middleware/isAuthenticated")


const router = require("express").Router()


router.route("/").post(isAuthenticated,catchAsync(createOrder)).get(isAuthenticated,catchAsync(getMyOrders))


module.exports = router