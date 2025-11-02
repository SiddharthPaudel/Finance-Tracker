import express from "express";

import { addCategory,deleteCategory,getCategories, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();
router.post("/add",addCategory);
router.get("/:userId",getCategories);
router.delete("/delete/:categoryId",deleteCategory);
router.put("/update/:categoryId",updateCategory);

export default router;