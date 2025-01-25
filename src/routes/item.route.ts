import express from "express";
import {
  createItem,
  getAllItems,
  getItemById,
  getItemByName,
  getItemsByCategoryId,
  getItemsBySubcategoryId,
  searchItemByName,
  updateItem,
} from "../controllers/item.controller.js";
const router = express.Router();
router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);
router.get("/name/:name", getItemByName);
router.get("/category/:id", getItemsByCategoryId);
router.get("/subcategory/:id", getItemsBySubcategoryId);
router.put("/:id", updateItem);
router.get("/search/:name", searchItemByName);
export default router;
