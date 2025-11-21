import express from "express";
import { getDashboardSummary } from "../controllers/dashboardController.js";
import { authMiddleware } from "../utils/middleware.js";

const router =express.Router();

router.get("/summary/:userId",getDashboardSummary);

export default router;
