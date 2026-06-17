const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controlleer")
const authMiddleware = require("../middleware/auth.middleware")

authRouter.post("/register",authController.registerusercontroller)
authRouter.post("/login",authController.loginController)
authRouter.post("/logout",authController.logoutUserController)
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController)
module.exports = authRouter