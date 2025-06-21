import { validationResult } from "express-validator";
import {
  createCategoryService,
  getAllCategoryService,
  updateCategoryService,
} from "./category.service.js";

//createCategory
export const createCategory = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        status: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const { name } = req.body;
    const response = await createCategoryService(name);
    return res.status(response.code).json(response);
  } catch (error) {
    return res.json({
      success: false,
      message: `ERROR ${error}`,
    });
  }
};

// updateCategory
export const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { name, isActive = true } = req.body;
    const response = await updateCategoryService({
      categoryId,
      name,
      isActive,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.json({
      success: false,
      message: `ERROR ${error}`,
    });
  }
};
export const getAllCategory = async (req, res, next) => {
  try {
    const { search, page = 1, perpagedata = 10 } = req.query;
    const response = await getAllCategoryService({
      search,
      page,
      perpagedata,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `ERROR ${error}`,
    });
  }
};
