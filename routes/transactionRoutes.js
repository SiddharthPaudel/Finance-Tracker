import express from "express";
import { addTransaction, deleteTransaction ,getTransactions } from "../controllers/transactionController.js";

const router = express.Router();
router.post("/add",addTransaction);
router.get("/:userId",getTransactions);
router.delete("delete/:transactionId",deleteTransaction)

export default router;