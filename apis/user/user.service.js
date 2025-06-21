import {
  comparePassword,
  hashPassword,
} from "../../helper/comman/hashingPassword.js";
import UserModel from "../../models/user.model.js";
import { userRole as roles } from "../../helper/comman/constant.js";
import { generateToken } from "../../helper/comman/jwtToken.js";
import { sendMail } from "../../helper/comman/sendMail.js";
// register service
export async function userRegiterService({ name, email, password, role }) {
  if (!roles.includes(role)) {
    return {
      code: 400,
      success: false,
      message: "Invalid user role",
    };
  }
  let user = await UserModel.findOne({ email });

  if (user) {
    return {
      code: 400,
      success: false,
      message: "user already exits",
    };
  }
  const hashedPassword = await hashPassword(password);

  user = await UserModel.create({
    userName: name,
    email,
    password: hashedPassword,
    role,
  });
  return {
    code: 201,
    status: true,
    message: "User registered successfully",
  };
}

//login service
export async function userLoginService({ email, password }) {
  let user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return {
      code: 401,
      success: false,
      message: "password or email incorrect",
    };
  }

  const isMatched = await comparePassword(password, user.password);

  if (!isMatched) {
    return {
      code: 401,
      success: true,
      message: "password or email incorrect",
    };
  }
  const token = generateToken(user._id);

  return {
    code: 200,
    status: true,
    message: "User login successfully",
    token,
  };
}

//get profile
export async function getProfileService(userId) {
  const user = await UserModel.findById(userId);
  return {
    code: 200,
    success: true,
    user,
  };
}

//edit profile service
export async function editProfileService({ name, email, user }) {
  if (name) user.userName = name;
  if (email) user.email = email;
  await user.save();
  return {
    code: 200,
    success: true,
    message: "Edit profile successfully",
  };
}
//forget password service
export async function forgetPasswordService({ email }) {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return {
      code: 401,
      success: false,
      message: "email is not registered",
    };
  }
  const token = Math.floor(Math.random() * 10000000000);

  user.token = token;
  sendMail(email, "Sample email", `your password token is ${token}`);
  await user.save();
  return {
    code: 200,
    success: true,
    message: "email is send to your registered email",
  };
}

// reset password service
export async function resetPasswordService({ token, newPassword }) {
  const user = await UserModel.findOne({ token });
  if (!user) {
    return {
      code: 401,
      sucess: false,
      message: "token is invalid",
    };
  }
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();

  return {
    code: 200,
    success: true,
    message: "your password is reset Successfully",
  };
}
