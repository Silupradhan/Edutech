const express = require("express")
const { sendOtp, Signup } = require("../controller/authController")

const router = express.Router()

router.post("/sendOtp",sendOtp)
router.post("/signup",Signup)

module.exports = router