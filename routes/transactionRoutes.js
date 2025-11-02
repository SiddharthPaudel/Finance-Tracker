import express from "express";
import { addTransaction, deleteTransaction ,getTransactions } from "../controllers/transactionController.js";
import { authMiddleware } from "../utils/middleware.js";

const router = express.Router();
router.post("/add",authMiddleware,addTransaction);
router.get("/:userId",getTransactions);
router.delete("delete/:transactionId",deleteTransaction)

export default router;