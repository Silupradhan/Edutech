const express = require("express")
const { sendOtp, Signup, Signin } = require("../controller/authController")

const router = express.Router()

router.post("/sendOtp",sendOtp)
router.post("/signup",Signup)
router.post("/signin",Signin)

module.exports = router