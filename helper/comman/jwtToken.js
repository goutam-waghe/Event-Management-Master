import jwt from "jsonwebtoken";

export function generateToken(userId) {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
}
