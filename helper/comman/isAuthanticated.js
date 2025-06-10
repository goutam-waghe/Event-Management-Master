import jwt from "jsonwebtoken";
import UserModel from "../../models/user.model.js";

export const isAuthanticated = async (req, res, next) => {
  try {
    const token = req.headers?.token?.split(" ")[1] || null;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "invalid token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "invalid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
