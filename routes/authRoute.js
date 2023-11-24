const { registerUser, loginUser } = require("../controller/auth/authController")


router = require("express").Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

module.exports = router