import bookingModel from "../../models/booking.model.js";
import EventModel from "../../models/Event.model.js";
import UserModel from "../../models/user.model.js";

export const userDashboardService = async (userId) => {
  const event = await EventModel.find({}).lean();
  const mytickets = await bookingModel.find({ userId: userId }).lean();
  console.log("runnign");
  const upcommingEvents = event.filter((ev) => {
    const startDate = ev.startDateTime.replace(" ", "T");
    const targetDate = new Date(startDate);
    return Date.now() < targetDate.getTime();
  });
  const eventCount = upcommingEvents.length;
  const nextEvent = upcommingEvents.sort(
    (a, b) => a.startDate - b.startDate
  )[0];
  console.log("runnign");
  return {
    code: 200,
    success: true,
    message: "data fetch",
    Data: {
      eventCount,
      upcommingEvents,
      nextEvent,
      mytickets,
    },
  };
};
export const adminDashboardService = async (userId) => {
  const events = await EventModel.find({}).lean();
  const users = await UserModel.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);
  let organizerCount = 0,
    adminCount = 0,
    userCount = 0;

  users.forEach((user) => {
    if (user._id === "user") {
      userCount = user.count;
    } else if (user._id === "organizer") {
      organizerCount = user.count;
    } else if (user._id === "admin") {
      adminCount = user.count;
    }
  });

  let totaluser = userCount + organizerCount + adminCount;

  const upcommingEvents = events.filter((ev) => {
    const startDate = ev.startDateTime.replace(" ", "T");
    const targetDate = new Date(startDate);
    return Date.now() < new Date(targetDate);
  });
  const upcommingEventsCount = upcommingEvents.length;
  const obj = await bookingModel.aggregate([
    {
      $project: {
        numberOfTickets: 1,
        pricePerTicket: 1,
        revenue: { $multiply: ["$numberOfTickets", "$pricePerTicket"] },
      },
    },
    {
      $group: {
        _id: null,
        totalTickets: { $sum: "$numberOfTickets" },
        totalBookings: { $sum: 1 },
        totalRevenue: { $sum: "$revenue" },
      },
    },
  ]);

  const totalTickets = obj[0]?.totalTickets || 0;
  const totalRevenue = obj[0]?.totalRevenue || 0;
  const totalBookings = obj[0]?.totalBookings || 0;

  return {
    code: 200,
    success: true,
    data: {
      events,
      upcommingEvents,
      upcommingEventsCount,
      totaluser,
      typesOfUser: {
        organizerCount,
        adminCount,
        userCount,
      },
      totalTickets,
      totalRevenue,
      totalBookings,
    },
  };
};

export const organizerDashboardService = async (userId) => {
  const events = await EventModel.find({ userId: userId }).lean();
  const eventIds = events.map((event) => {
    return event._id;
  });

  const upCommingEventsCounnt = events.filter((ev) => {
    const startDate = ev.startDateTime.replace(" ", "T");
    const targetDate = new Date(startDate);
    return Date.now() < new Date(targetDate);
  }).length;

  const obj = await bookingModel.aggregate([
    {
      $match: { eventId: { $in: eventIds } },
    },
    {
      $group: {
        _id: null,
        totalTicketSold: { $sum: "$numberOfTickets" },
        totalRevenue: {
          $sum: { $multiply: ["$numberOfTicket", "$pricePerTicket"] },
        },
      },
    },
  ]);
  const totalSoldTickets = obj[0]?.totalTicketSold || 0;
  const totalRevenue = obj[0]?.totalRevenue || 0;
  return {
    code: 200,
    success: true,
    message: "",
    data: {
      events,
      upCommingEventsCounnt,
      totalSoldTickets,
      totalRevenue,
    },
  };
};
