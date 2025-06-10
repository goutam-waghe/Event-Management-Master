import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  myEvents: {
    type: Array,
    default: [],
  },

  profileImage: {
    type: String,
  },
  createdAt: {
    type: String,
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: Date.now,
  },
  token: {
    type: String,
  },
});

const UserModel = mongoose.model("UserModel", userSchema);
export default UserModel;
