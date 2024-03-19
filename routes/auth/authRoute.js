
const catchAsync = require("../../Services/catchAsync")
const { registerUser, loginUser, forgetPassword,verifyOtp, resetPassword } = require("../../controller/auth/authController")


router = require("express").Router()


router.route("/register").post(catchAsync(registerUser))
router.route("/login").post(catchAsync(loginUser))
router.route("/forgetPassword").post(catchAsync(forgetPassword))
router.route('/verifyOtp').post(catchAsync(verifyOtp))
router.route('/resetPassword').post(catchAsync(resetPassword))

module.exports = router