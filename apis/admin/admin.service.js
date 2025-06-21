import UserModel from "../../models/user.model.js";
import { userRole as roles } from "./../../helper/comman/constant.js";

export async function updateRoleService({ userId, role }) {
  const user = await UserModel.findById(userId);
  if (!user) {
    return {
      Code: 404,
      success: false,
      message: "user not found",
    };
  }
  if (!roles.includes(role)) {
    return {
      code: 401,
      success: false,
      message: "Invalid user role",
    };
  }

  user.role = role;
  user.save();
  return {
    code: 200,
    success: true,
    message: "user role change successfully",
  };
}

export async function manageUsersService() {
  const users = await UserModel.find({});
  return {
    code: 200,
    success: true,
    users,
  };
}
