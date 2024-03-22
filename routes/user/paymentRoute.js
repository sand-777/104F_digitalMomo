const catchAsync = require("../../Services/catchAsync")
const { initiateKhaltiPayment, verifyPidx } = require("../../controller/admin/user/payment/paymentController")
const isAuthenticated = require("../../middleware/isAuthenticated")

const router = require("express").Router()



router.route("/").post(isAuthenticated,catchAsync(initiateKhaltiPayment))
router.route("/success").get(catchAsync(verifyPidx))

module.exports = router