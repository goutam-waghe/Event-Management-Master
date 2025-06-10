import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./apis/user/user.route.js";
import CategoryRouter from "./apis/category/category.route.js";
import bookingRouter from "./apis/booking/booking.route.js";
import eventRouter from "./apis/event/event.route.js";
const app = express();

// .env
config({ path: "./config/.env" });

// Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors())

// routes
app.use(userRouter);
app.use(CategoryRouter);
app.use(eventRouter);
app.use(bookingRouter);

export default app;
