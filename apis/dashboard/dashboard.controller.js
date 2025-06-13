import bookingModel from "../../models/booking.model.js";
import EventModel from "../../models/event.model.js";
import userModel from "../../models/user.model.js";
//user dashboard
export const userDashboard = async function (req, res, next) {
  try {
    const userId = req.user._id;
    const event = await EventModel.find({});
    const mytickets = await bookingModel.find({ userId: userId });
    console.log(mytickets);

    const upcommingEvents = event.filter((ev) => {
      const startDate = ev.startDateTime.replace(" ", "T");
      const targetDate = new Date(startDate);

      return Date.now() < targetDate.getTime();
    });
    const eventCount = upcommingEvents.length;
    const nextEvent = upcommingEvents.sort(
      (a, b) => a.startDate - b.startDate
    )[0];
    console.log(nextEvent);

    res.status(200).json({
      success: true,
      message: "data fetch",
      Data: {
        eventCount,
        upcommingEvents,
        nextEvent,
        mytickets,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `ERROR ${error.massage}`,
    });
  }
};

// admin dashboard
export const adminDashboard = async function () {
  try {
    const events = await EventModel.find({});
    const users = await userModel.find({});
    const totalUserCount = users.length;
    const numberOfAdmin = users.filter((user) => user.role === "admin").length;
    const numberOfuser = users.filter((user) => user.role === "user").length;
    const numberOfOrganizer = users.filter(
      (user) => user.role === "organizer"
    ).length;

    const upcommingEvents = events.filter((ev) => {
      const startDate = ev.startDateTime.replace(" ", "T");
      const targetDate = new Date(startDate);
      return Date.now() < new Date(targetDate);
    });
    const upcommingEventsCount = upcommingEvents.length;

    const obj = await bookingModel.aggregate([
      {
        $group: {
          _id: null,
          totalTickets: { $sum: "$numberOfTickets" },
          totalBookings: { $sum: 1 },
          totalRevenue: { $multiply: ["$numberOfTicket", "$pricePerTicket"] },
        },
      },
    ]);

    const totalTickets = obj[0]?.totalTickets || 0;
    const totalRevenue = obj[0]?.totalRevenue || 0;
    const totalBookings = obj[0]?.totalBookings || 0;
    console.log(obj);
    res.json({
      success: true,
      data: {
        events,
        upcommingEvents,
        upcommingEventsCount,
        totalUserCount,
        typesOfUser: {
          numberOfOrganizer,
          numberOfAdmin,
          numberOfuser,
        },
        totalTickets,
        totalRevenue,
        totalBookings,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `ERROR ${error.massage}`,
    });
  }
};

//or
export const organizerDashboard = async function () {
  try {
    const userId = req.user._id;
    const events = await EventModel.find({ userId: userId });
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
    const totalSoldTickets = obj[0]?.totalTicketSold;
    const totalRevenue = obj[0]?.totalRevenue;
    res.json({
      success: true,
      message: "",
      data: {
        events,
        upCommingEventsCounnt,
        totalSoldTickets,
        totalRevenue,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `ERROR ${error.massage}`,
    });
  }
};
