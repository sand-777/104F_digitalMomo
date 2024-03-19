const catchAsync = require("../../Services/catchAsync")
const { addToCart, getMyCartItems, deleteCartItem } = require("../../controller/user/cart/cartController")
const isAuthenticated = require("../../middleware/isAuthenticated")


const router = require("express").Router()

router.route("/").get(isAuthenticated,catchAsync(getMyCartItems))
router.route("/:productId").post(isAuthenticated,catchAsync(addToCart)).delete(isAuthenticated,catchAsync(deleteCartItem))




module.exports = router
