const { registerUser, loginUser, forgetPassword } = require("../controller/auth/authController")


router = require("express").Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgetPassword").post(forgetPassword)

module.exports = router