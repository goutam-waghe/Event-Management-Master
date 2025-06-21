import { bookingTicketService } from "./booking.service.js";

//booking ticket
export const bookingTicket = async (req, res, next) => {
  try {
    const { numberOfTickets, eventId } = req.body;
    const userId = req.user._id;
    const response = bookingTicketService({ numberOfTickets, eventId, userId });
    return res.status(response.code).json(response);
  } catch (error) {
    return res.json({
      success: false,
      message: `Error ${error.message}`,
    });
  }
};

//cencel ticket
export const cencelTicket = () => {};
