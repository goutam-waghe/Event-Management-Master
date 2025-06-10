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
  .route("/event/create")
  .post(Validator("EventValidator"), isAuthanticated, createEvent);
eventRouter.route("/event/update/:id").put(UpdateEvent);
eventRouter.route("/event/all").get(getAllEvents);
eventRouter
  .route("/event/uplaodimage")
  .post(upload.array("images", 5), eventImageUpload);

eventRouter.route("/event/delete/:id").delete(deleteEvent);

export default eventRouter;
