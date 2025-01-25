import asyncWrapper from "../utils/AsyncWrapper";
import { Request, Response, NextFunction } from "express";
import ExpressResponse from "../utils/ExpressResponse";
import ExpressError from "../utils/ExpressError";
import Subcategory from "../models/subcategory.model";
import { z } from "zod";
import mongoose from "mongoose";

// @ desc Create a new subcategory
// @route POST /api/v1/subcategories
const subcategoryVal = z.object({
  name: z.string().min(3).max(50),
  image: z.string(),
  description: z.string().min(10),
  taxApplicability: z.boolean(),
  tax: z.number(),
  taxType: z.string().optional(),
  categoryId: z.string(),
});
export const createSubcategory = asyncWrapper(
  async (req: Request, res: Response) => {
    const {
      name,
      image,
      description,
      taxApplicability,
      tax,
      taxType,
      categoryId,
    } = subcategoryVal.parse(req.body);
    const subcategory = await Subcategory.create({
      name,
      image,
      description,
      taxApplicability,
      tax,
      taxType,
      categoryId,
    });
    res
      .status(201)
      .json(
        new ExpressResponse(
          201,
          "Subcategory created successfully",
          subcategory
        )
      );
  }
);
// @ desc Get all subcategories
// @route GET /api/v1/subcategories
export const getAllSubcategories = asyncWrapper(
  async (req: Request, res: Response) => {
    const subcategories = await Subcategory.find({});
    if (!subcategories) {
      throw new ExpressError(
        404,
        "No sub-categories found. Please add some sub-categories."
      );
    }
    res
      .status(200)
      .json(
        new ExpressResponse(
          200,
          "Sub-categories found successfully",
          subcategories
        )
      );
  }
);
// @ func Get all subcategories under a category
// @route GET /api/v1/subcategories/category/:id
export const getSubcategoriesByCategory = asyncWrapper(
  async (req: Request, res: Response) => {
    const subcategories = await Subcategory.find({ categoryId: req.params.id });
    if (!subcategories) {
      throw new ExpressError(
        404,
        "No sub-categories found under this category."
      );
    }
    res
      .status(200)
      .json(
        new ExpressResponse(
          200,
          "Sub-categories found successfully",
          subcategories
        )
      );
  }
);
// @ desc Get single subcategory by id or name
// @route GET /api/v1/subcategories/:id
export const getSubcategory = asyncWrapper(
  async (req: Request, res: Response) => {
    // Check if the id is a valid ObjectId or a name
    const isId = mongoose.Types.ObjectId.isValid(req.params.id);
    let query;
    if (isId) query = { _id: req.params.id };
    else query = { name: req.params.id };
    const subcategory = await Subcategory.findOne(query);
    if (!subcategory) {
      throw new ExpressError(404, "Subcategory not found.");
    }
    res
      .status(200)
      .json(
        new ExpressResponse(200, "Subcategory found successfully", subcategory)
      );
  }
);
// @ desc Update a subcategory by id
// @route PUT /api/v1/subcategories/:id
const updateSubcategoryVal = z.object({
  name: z.string().min(3).max(50).optional(),
  image: z.string().optional(),
  description: z.string().min(10).optional(),
  taxApplicability: z.boolean().optional(),
  tax: z.number().optional(),
  taxType: z.string().optional(),
});
export const updateSubcategory = asyncWrapper(
  async (req: Request, res: Response) => {
    const { name, image, description, taxApplicability, tax, taxType } =
      updateSubcategoryVal.parse(req.body);
    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { name, image, description, taxApplicability, tax, taxType },
      {
        new: true,
        runValidators: false,
      }
    );
    if (!subcategory) {
      throw new ExpressError(404, "Subcategory not found.");
    }
    res
      .status(200)
      .json(
        new ExpressResponse(
          200,
          "Subcategory updated successfully",
          subcategory
        )
      );
  }
);
