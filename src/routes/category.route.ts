import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryByIdOrName,
  updateCategoryById,
} from "../controllers/category.controller";
const router = express.Router();
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryByIdOrName);
router.put("/:id", updateCategoryById);
export default router;
