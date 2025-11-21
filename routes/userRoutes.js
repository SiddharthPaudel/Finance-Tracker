import express from "express";
import {LoginUser, registerUser,verifyEmail,getMe, logout} from "../controllers/userController.js"


const router = express.Router();
router.post("/register", registerUser);
router.post("/login",LoginUser)
router.get("/verify",verifyEmail)
router.get("/me", getMe);
router.post("/logout",logout)

export default router;