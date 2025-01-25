import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoriesByCategory,
  getSubcategory,
  updateSubcategory,
} from "../controllers/subcategory.controller.js";
const router = express.Router();
router.post("/", createSubcategory);
router.get("/", getAllSubcategories);
router.get("/category/:id", getSubcategoriesByCategory);
router.get("/:id", getSubcategory);
router.put("/:id", updateSubcategory);
export default router;
