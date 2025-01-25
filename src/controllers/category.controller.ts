import asyncWrapper from "../utils/AsyncWrapper";
import { Request, Response } from "express";
import ExpressResponse from "../utils/ExpressResponse";
import ExpressError from "../utils/ExpressError";
import Category from "../models/category.model";
import { z } from "zod";
import mongoose from "mongoose";

const categoryVal = z.object({
  name: z.string().min(3).max(50),
  image: z.string(),
  description: z.string().min(10),
  taxApplicability: z.boolean(),
  tax: z.number(),
  taxType: z.string().optional(),
});
// @ desc Create a new category
// @route POST /api/v1/categories
export const createCategory = asyncWrapper(
  async (req: Request, res: Response) => {
    const { name, image, description, taxApplicability, tax, taxType } =
      categoryVal.parse(req.body);
    const category = await Category.create({
      name,
      image,
      description,
      taxApplicability,
      tax,
      taxType,
    });
    res
      .status(201)
      .json(
        new ExpressResponse(201, "Category created successfully", category)
      );
  }
);
// @ desc Get all categories
// @route GET /api/v1/categories
export const getAllCategories = asyncWrapper(
  async (req: Request, res: Response) => {
    const categories = await Category.find({});
    if (!categories) {
      throw new ExpressError(
        404,
        "No categories found. Please add some categories."
      );
    }
    res
      .status(200)
      .json(
        new ExpressResponse(200, "Categories found successfully", categories)
      );
  }
);
// @ desc Get single category by id or name
// @route GET /api/v1/categories/:id
export const getCategoryByIdOrName = asyncWrapper(
  async (req: Request, res: Response) => {
    // Check if the id is a valid ObjectId or a name
    const isId = mongoose.Types.ObjectId.isValid(req.params.id);
    let query;
    if (isId) query = { _id: req.params.id };
    else query = { name: req.params.id };
    const category = await Category.findOne(query);
    if (!category) {
      throw new ExpressError(404, "Category not found.");
    }
    res
      .status(200)
      .json(new ExpressResponse(200, "Category found successfully", category));
  }
);
// @ desc Update a category by id
// @route PUT /api/v1/categories/:id
const updateCategoryVal = z.object({
  name: z.string().min(3).max(50).optional(),
  image: z.string().optional(),
  description: z.string().min(10).optional(),
  taxApplicability: z.boolean().optional(),
  tax: z.number().optional(),
  taxType: z.string().optional(),
});
export const updateCategoryById = asyncWrapper(
  async (req: Request, res: Response) => {
    const { name, image, description, taxApplicability, tax, taxType } =
      updateCategoryVal.parse(req.body);
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      { name, image, description, taxApplicability, tax, taxType },
      { new: true, runValidators: false }
    );
    if (!category) {
      throw new ExpressError(404, "Category not found.");
    }
    res
      .status(200)
      .json(
        new ExpressResponse(200, "Category updated successfully", category)
      );
  }
);
