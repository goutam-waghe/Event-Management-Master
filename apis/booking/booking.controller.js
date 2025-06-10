import mongoose from "mongoose";
import bookingModel from "../../models/booking.model.js";
import EventModel from "../../models/event.model.js";

//booking ticket
export const bookingTicket = async (req, res, next) => {
  const { numberOfTickets, eventId } = req.body;
  const userId = req.user._id;
  // checking event
  const event = await EventModel.findById(eventId).lean();
  if (!event) {
    return res.json({
      sucess: false,
      message: "event not found",
    });
  }

  //check Awailable tickets
  const BookedTickets = await bookingModel.aggregate([
    {
      $match: {
        eventId: eventId,
      },
    },
    {
      $group: {
        _id: null,
        totalTickets: { $sum: "$numberOfTickets" },
      },
    },
  ]);
  console.log(BookedTickets);
  const totalBooked = BookedTickets[0]?.totalTickets || 0;
  const remainingCapacity = event.capacity - totalBooked;
  console.log(remainingCapacity);

  if (remainingCapacity < numberOfTickets) {
    return res.json({
      sucess: true,
      message: `only ${remainingCapacity} are left`,
    });
  }

  await bookingModel.create({
    numberOfTickets,
    eventId,
    userId,
  });
  res.json({
    message: "booked",
  });
};

//cencel ticket
export const cencelTicket = () => {};
