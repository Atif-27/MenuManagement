import express from "express";
import {
  createItem,
  getAllItems,
  getItem,
  getItemsByCategoryId,
  getItemsBySubcategoryId,
  searchItemByName,
  updateItem,
} from "../controllers/item.controller";
const router = express.Router();
router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getItem);
router.get("/category/:id", getItemsByCategoryId);
router.get("/subcategory/:id", getItemsBySubcategoryId);
router.put("/:id", updateItem);
router.get("/search/:name", searchItemByName);
export default router;
