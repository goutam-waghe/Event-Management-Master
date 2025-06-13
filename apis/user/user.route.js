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
  manageUsers,
  updateRole,
} from "./user.controller.js";
import { isAuthanticated } from "../../helper/comman/isAuthanticated.js";
import upload from "../../helper/comman/multer.js";
import sendMailwithemailjs from "../../helper/comman/email.js";
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

// admin
userRouter.route("/manage/users").get(isAuthanticated, manageUsers);
userRouter.route("/manage/role/:id").post(isAuthanticated, updateRole);

//send email
userRouter.post("/send-email", async (req, res, next) => {
  const { time, name, message, title } = req.body;
  const result = sendMailwithemailjs({ time, name, message, title });
  res.json({
    result,
  });
});

export default userRouter;
