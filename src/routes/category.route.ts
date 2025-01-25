import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategoryById,
} from "../controllers/category.controller";
const router = express.Router();
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategoryById);
export default router;
