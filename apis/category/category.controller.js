import CategoryModel from "../../models/category.model.js";

import { validationResult } from "express-validator";
export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        status: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    let category = await CategoryModel.findOne({ name });
    if (category) {
      return res.status(401).json({
        success: false,
        message: "category is already exits",
      });
    }
    category = await CategoryModel.create({
      name,
    });

    res.json({
      success: true,
      message: "category created",
    });
  } catch (error) {
    res.json({
      success: false,
      message: `ERROR ${error}`,
    });
  }
};
export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name, isActive = true } = req.body;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return res.status(401).json({
      success: false,
      message: "category not found",
    });
  }

  if (name) category.name = name;

  if (isActive) {
    category.isAcitve = true;
  } else {
    category.isAcitve = false;
  }
  await category.save();
  res.status(200).json({
    success: true,
    message: "category updated sucessfully",
  });
};
export const getAllCategory = async (req, res, next) => {
  const { search, page = 1, perpagedata = 10 } = req.query;

  const perPage = Number(page);

  const limit = Number(perpagedata);
  const skip = (perPage - 1) * limit;
  let filter;
  if (search.trim()) {
    filter = {
      name: { $regex: ".*" + search + ".*", $options: "i" },
    };
  }
  const allList = await CategoryModel.find(filter)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    allList,
  });
};
