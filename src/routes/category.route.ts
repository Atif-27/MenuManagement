import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  updateCategoryById,
} from "../controllers/category.controller.js";
const router = express.Router();
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.get("/name/:name", getCategoryByName);
router.put("/:id", updateCategoryById);
export default router;
