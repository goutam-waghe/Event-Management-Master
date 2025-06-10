import { Router } from "express";
import { Validator } from "../../helper/comman/validator.js";
import {
  createCategory,
  getAllCategory,
  updateCategory,
} from "./category.controller.js";
const CategoryRouter = Router();

CategoryRouter.route("/category/create").post(
  Validator("categoryValidator"),
  createCategory
);
CategoryRouter.route("/category/update/:id").put(updateCategory);
CategoryRouter.route("/category/all").get(getAllCategory);

export default CategoryRouter;
