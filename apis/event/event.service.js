import moment from "moment";
import CategoryModel from "../../models/category.model.js";
import EventModel from "../../models/Event.model.js";

//create event service
export async function createEventService({
  title,
  description,
  startDateTime,
  venue,
  capacity,
  ticketPrice,
  categoryId,
  userId,
}) {
  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    return {
      code: 404,
      success: false,
      message: "category not found",
    };
  }
  const eventDate = moment(startDateTime, "YYYY-MM-DD HH:mm", true);

  if (!eventDate.isValid()) {
    return {
      code: 400,
      status: false,
      message: "invaild date_time",
    };
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

  return {
    code: 200,
    success: true,
    message: "event created successfully",
    event,
  };
}

//update Event Service
export async function updateEventService({
  title,
  description,
  startDateTime,
  venue,
  capacity,
  ticketPrice,
  categoryId,
  eventId,
  userId,
}) {
  const event = await EventModel.findById(eventId);
  if (!event) {
    return {
      code: 404,
      success: true,
      message: "event not found",
    };
  }
  console.log(String(userId));
  if (String(userId) !== String(event.userId)) {
    return {
      code: 401,
      message: "you dont have Access to this operation",
    };
  }
  if (title)
    //update
    event.title = title;
  if (description) event.description = description;
  if (startDateTime) event.startDateTime = startDateTime;
  if (venue) event.venue = venue;
  if (capacity) event.capacity = capacity;
  if (ticketPrice) event.ticketPrice = ticketPrice;

  if (categoryId) {
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      return {
        code: 404,
        success: false,
        message: "category not found",
      };
    }
    event.categoryId = categoryId;
  }

  await event.save();
  return {
    code: 200,
    success: true,
    message: "event updated successfully",
    event,
  };
}

//delete event
export async function deleteEventService(eventId) {
  const event = await EventModel.findById(eventId);

  if (!event) {
    return {
      code: 404,
      success: true,
      message: "event not found",
    };
  }
  await event.deleteOne();
  return {
    code: 200,
    success: true,
    message: "event deleted successfully",
  };
}

//get all events
export async function getAllEventsService({ search, page, perpagedata }) {
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

  return {
    code: 200,
    success: true,
    events,
  };
}
