import { validationResult } from "express-validator";
import UserModel from "../../models/user.model.js";
import {
  comparePassword,
  hashPassword,
} from "../../helper/comman/hashingPassword.js";
import { generateToken } from "../../helper/comman/jwtToken.js";
import { sendMail } from "../../helper/comman/sendMail.js";
import { userRole as roles } from "../../helper/comman/constant.js";

export const userRegiter = async function (req, res, next) {
  try {
    const { name, email, password, role = "user" } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        status: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    if (!roles.includes(role)) {
      return res.status(200).json({
        success: false,
        message: "Invalid user role",
      });
    }
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(401).json({
        success: false,
        message: "user already exits",
      });
    }
    const hashedPassword = await hashPassword(password);

    user = await UserModel.create({
      userName: name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(200).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//user login

export const userLogin = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        status: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    let user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "password or email incorrect",
      });
    }

    const isMatched = await comparePassword(password, user.password);

    if (!isMatched) {
      return res.status(401).json({
        success: true,
        message: "password or email incorrect",
      });
    }
    const token = generateToken(user._id);

    res.status(200).json({
      status: true,
      message: "User login successfully",
      token,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//profile
export const userProfile = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//edit profile
export const editProfile = async function (req, res, next) {
  try {
    const { name, email } = req.body;
    const user = await UserModel.findById(req.user._id);
    if (name) user.userName = name;
    if (email) user.email = email;

    await user.save();
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// update profile picture
export const updateProfilePicture = async function (req, res, next) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "file not found",
      });
    }
    res.json({
      success: true,
      message: "file uplaod successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

//forget password
export const forgetPassword = async function (req, res, next) {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(402).json({
      success: false,
      message: "email is not registered",
    });
  }
  const token = Math.floor(Math.random() * 10000000000);

  user.token = token;
  sendMail(email, "Sample email", `your password token is ${token}`);
  await user.save();
  res.status(200).json({
    success: true,
    message: "email is send to your registered email",
  });
};

export const resetPassword = async function (req, res, next) {
  const { token } = req.params;
  const { newPassword } = req.body;
  const user = await UserModel.findOne({ token });
  if (!user) {
    return res.json({
      sucess: false,
      message: "token is invalid",
    });
  }
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "password is reset successfully",
  });
};

//list of user
export const manageUsers = async function (req, res, next) {
  const users = await UserModel.find({});
  res.status(200).json({
    success: true,
    users,
  });
};

//change role
export const updateRole = async function (req, res, next) {
  const { id } = req.params;
  const { role } = req.body;
  const user = await UserModel.findById(id);
  if (!user) {
    return res.json({
      success: false,
      message: "user not found",
    });
  }
  if (!roles.includes(role)) {
    return res.status(200).json({
      success: false,
      message: "Invalid user role",
    });
  }

  user.role = role;
  user.save();
  res.json({
    success: true,
    message: "user role change successfully",
  });
};

//send email
