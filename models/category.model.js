import mongoose from "mongoose";

const catogorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isAcitve: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const CategoryModel = mongoose.model("CategoryModel", catogorySchema);
export default CategoryModel;
