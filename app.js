import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./apis/user/user.route.js";
import CategoryRouter from "./apis/category/category.route.js";
import bookingRouter from "./apis/booking/booking.route.js";
import eventRouter from "./apis/event/event.route.js";
import dashboardRouter from "./apis/dashboard/dashboard.route.js";
const app = express();

// .env
config({ path: "./config/.env" });

// Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors())

// routes
app.use("/user", userRouter);
app.use("/category", CategoryRouter);
app.use("/event", eventRouter);
app.use("/booking", bookingRouter);
app.use("/dashboard", dashboardRouter);

export default app;
