import { Router } from "express";
import { Validator } from "../../helper/comman/validator.js";
import {
  editProfile,
  userLogin,
  userProfile,
  userRegiter,
  updateProfilePicture,
  forgetPassword,
  resetPassword,
} from "./user.controller.js";
import { isAuthanticated } from "../../helper/comman/isAuthanticated.js";
import upload from "../../helper/comman/multer.js";
const userRouter = Router();

userRouter.route("/register").post(Validator("registerValidator"), userRegiter);
userRouter.route("/login").post(Validator("loginValidator"), userLogin);
userRouter.route("/me").get(isAuthanticated, userProfile);
userRouter.route("/updateprofile").put(isAuthanticated, editProfile);

userRouter
  .route("/updateprofilepicture")
  .put(isAuthanticated, upload.single("file"), updateProfilePicture);
userRouter.route("/forgetpassword").put(forgetPassword);
userRouter.route("/resetpassword/:token").put(resetPassword);
export default userRouter;
