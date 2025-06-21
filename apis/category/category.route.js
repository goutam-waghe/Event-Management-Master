import { Router } from "express";
import { Validator } from "../../helper/comman/validator.js";
import {
  createCategory,
  getAllCategory,
  updateCategory,
} from "./category.controller.js";
import { isAuthanticated } from "../../helper/comman/isAuthanticated.js";
const CategoryRouter = Router();

CategoryRouter.route("/create").post(
  Validator("categoryValidator"),
  isAuthanticated,
  createCategory
);
CategoryRouter.route("/update/:id").put(isAuthanticated, updateCategory);
CategoryRouter.route("/all").get(getAllCategory);

export default CategoryRouter;
