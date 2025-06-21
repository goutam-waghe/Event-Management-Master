import { Router } from "express";
import { Validator } from "../../helper/comman/validator.js";
import { bookingTicket } from "./booking.controller.js";
import { isAuthanticated } from "../../helper/comman/isAuthanticated.js";

const bookingRouter = Router();

bookingRouter
  .route("/tickets")
  .post(Validator("bookingValidator"), isAuthanticated, bookingTicket);

export default bookingRouter;
