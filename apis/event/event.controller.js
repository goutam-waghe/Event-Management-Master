import { validationResult } from "express-validator";
import EventModel from "../../models/Event.model.js";
import CategoryModel from "../../models/category.model.js";
import moment from "moment";

export const createEvent = async (req, res, next) => {
  try {
    const {
      title,
      description,
      startDateTime,
      venue,
      capacity,
      ticketPrice,
      categoryId,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        success: false,
        message: `validation failed`,
        error: errors.array(),
      });
    }
    const userId = req.user._id;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return res.json({
        success: false,
        message: "category not found",
      });
    }
    const eventDate = moment(startDateTime, "YYYY-MM-DD HH:mm", true);

    if (!eventDate.isValid()) {
      return res.status(400).send({
        status: false,
        message: "invaild date_time",
      });
    }
    const event = await EventModel.create({
      title,
      description,
      startDateTime,
      venue,
      capacity,
      ticketPrice,
      userId,
      categoryId,
    });

    res.status(200).json({
      success: true,
      message: "event created successfully",
      event,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//update event

export const UpdateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      startDateTime,
      venue,
      capacity,
      ticketPrice,
      categoryId,
    } = req.body;

    const event = await EventModel.findById(id);
    if (!event) {
      return res.json({
        success: true,
        message: "event not found",
      });
    }

    //update
    if (title) event.title = title;
    if (description) event.description = description;
    if (startDateTime) event.startDateTime = startDateTime;
    if (venue) event.venue = venue;
    if (capacity) event.capacity = capacity;
    if (ticketPrice) event.ticketPrice = ticketPrice;
    if (categoryId) {
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        return res.json({
          success: false,
          message: "category not found",
        });
      }
      event.categoryId = categoryId;
    }

    await event.save();
    res.status(200).json({
      success: true,
      message: "event updated successfully",
      event,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//delete Event

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findById(id);

    if (!event) {
      return res.json({
        success: true,
        message: "event not found",
      });
    }

    await event.deleteOne();

    res.status(200).json({
      success: true,
      message: "event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//get all events
export const getAllEvents = async (req, res, next) => {
  try {
    console.log("printing..");
    const { search = "", page = 1, perpagedata = 10 } = req.query;

    const perPage = Number(page);
    const limit = Number(perpagedata);

    const skip = (perPage - 1) * limit;

    let filter = {};
    if (search.trim()) {
      filter = {
        name: { $regex: ".*" + search + ".*", $options: "i" },
      };
    }
    const events = await EventModel.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//upload images for events

export const eventImageUpload = async (req, res, next) => {
  try {
    const files = req.files;
    if (!files) {
      return res.status(200).json({
        success: false,
        message: "please uplaod files",
      });
    }
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`,
    });
  }
};

//get Event Details
