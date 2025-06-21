import bookingModel from "../../models/booking.model.js";
import EventModel from "../../models/event.model.js";

export async function bookingTicketService({
  numberOfTickets,
  eventId,
  userId,
}) {
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

  const totalBooked = BookedTickets[0]?.totalTickets || 0;
  const remainingCapacity = event.capacity - totalBooked;

  if (remainingCapacity < numberOfTickets) {
    return {
      code: 200,
      sucess: true,
      message: `only ${remainingCapacity} are left`,
    };
  }
  const pricePerTicket = event.ticketPrice;

  await bookingModel.create({
    numberOfTickets,
    eventId,
    pricePerTicket,
    userId,
  });
  return {
    code: 200,
    success: true,
    message: "your ticktes booked successfully",
  };
}
