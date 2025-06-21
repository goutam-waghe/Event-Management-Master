import { validationResult } from "express-validator";
import {
  editProfileService,
  forgetPasswordService,
  getProfileService,
  resetPasswordService,
  userLoginService,
  userRegiterService,
} from "./user.service.js";

export const userRegiter = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        status: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { name, email, password, role = "user" } = req.body;
    const response = await userRegiterService({ name, email, password, role });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

//user login

export const userLogin = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({
        status: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    const response = await userLoginService({ email, password });

    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

//profile
export const userProfile = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const response = await getProfileService(userId);
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//edit profile
export const editProfile = async function (req, res, next) {
  try {
    const { name, email } = req.body;
    const user = req.user;

    const response = await editProfileService({ name, email, user });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      message: `Error ${error.message}`,
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
    return res.status(500).json({
      success: false,
      message: `Error :${error.message} `,
    });
  }
};

//forget password
export const forgetPassword = async function (req, res, next) {
  try {
    const { email } = req.body;
    const response = await forgetPasswordService({ email });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error :${error.message} `,
    });
  }
};
//reset password
export const resetPassword = async function (req, res, next) {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const response = await resetPasswordService({ token, newPassword });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error :${error.message} `,
    });
  }
};

//send email
