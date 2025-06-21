import CategoryModel from "../../models/category.model.js";
// createCategoryService
export async function createCategoryService(name) {
  let category = await CategoryModel.findOne({ name });
  if (category) {
    return {
      code: 400,
      success: false,
      message: "category is already exits",
    };
  }
  category = await CategoryModel.create({
    name,
  });

  return {
    code: 200,
    success: true,
    message: "category created",
  };
}

//updateCategoryService
export async function updateCategoryService({ categoryId, name, isActive }) {
  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    return {
      code: 404,
      success: false,
      message: "category not found",
    };
  }

  if (name) category.name = name;

  if (isActive) {
    category.isAcitve = true;
  } else {
    category.isAcitve = false;
  }
  await category.save();
  return {
    code: 200,
    success: true,
    message: "category updated sucessfully",
  };
}

//getAllCategoryService
export async function getAllCategoryService({ search, page, perpagedata }) {
  const perPage = Number(page);
  const limit = Number(perpagedata);
  const skip = (perPage - 1) * limit;

  let filter = {};
  if (search) {
    filter = {
      name: { $regex: ".*" + search + ".*", $options: "i" },
    };
  }
  const allList = await CategoryModel.find(filter)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  return {
    code: 200,
    success: true,
    allList,
  };
}
