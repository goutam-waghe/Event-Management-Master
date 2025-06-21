import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  eventImageUpload,
  getAllEvents,
  UpdateEvent,
} from "./event.controller.js";
import { Validator } from "../../helper/comman/validator.js";
import upload from "../../helper/comman/multer.js";
import { isAuthanticated } from "../../helper/comman/isAuthanticated.js";

const eventRouter = Router();

//create event
eventRouter
  .route("/create")
  .post(Validator("EventValidator"), isAuthanticated, createEvent);
eventRouter.route("/update/:id").put(isAuthanticated, UpdateEvent);
eventRouter.route("/all").get(getAllEvents);
eventRouter
  .route("/uplaodimage")
  .post(isAuthanticated, upload.array("images", 5), eventImageUpload);

eventRouter.route("/delete/:id").delete(isAuthanticated, deleteEvent);

export default eventRouter;
