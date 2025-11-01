import express from "express";
import {LoginUser, registerUser,verifyEmail} from "../controllers/userController.js"


const router = express.Router();
router.post("/register", registerUser);
router.post("/login",LoginUser)
router.get("/verify",verifyEmail)

export default router;