import { validationResult } from "express-validator";
import {
  createEventService,
  deleteEventService,
  getAllEventsService,
  updateEventService,
} from "./event.service.js";

export const createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        success: false,
        message: `validation failed`,
        error: errors.array(),
      });
    }
    const {
      title,
      description,
      startDateTime,
      venue,
      capacity,
      ticketPrice,
      categoryId,
    } = req.body;
    const userId = req.user._id;
    const response = await createEventService({
      title,
      description,
      startDateTime,
      venue,
      capacity,
      ticketPrice,
      categoryId,
      userId,
    });

    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//update event
export const UpdateEvent = async (req, res, next) => {
  try {
    console.log("reached");
    const eventId = req.params.id;
    const userId = req.user._id;
    const {
      title,
      description,
      startDateTime,
      venue,
      capacity,
      ticketPrice,
      categoryId,
    } = req.body;

    const response = await updateEventService({
      title,
      description,
      startDateTime,
      venue,
      capacity,
      ticketPrice,
      categoryId,
      eventId,
      userId,
    });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//delete Event
export const deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const response = await deleteEventService(eventId);
    return res.status(response.code).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//get all events
export const getAllEvents = async (req, res, next) => {
  try {
    const { search = "", page = 1, perpagedata = 10 } = req.query;
    const response = await getAllEventsService({ search, page, perpagedata });
    return res.status(response.code).json(response);
  } catch (error) {
    res.statuc(200).json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//upload images for events
//baki hai
export const eventImageUpload = async (req, res, next) => {
  try {
    const files = req.files;
    if (!files) {
      return res.status(200).json({
        success: false,
        message: "please uplaod files",
      });
    }
    return res.status(200).json({
      success: true,
      message: "images successfully uploaded",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//get Event Details
