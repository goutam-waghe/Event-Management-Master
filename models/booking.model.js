import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  numberOfTickets: {
    type: Number,
    required: true,
  },
  pricePerTicket: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now().toString(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now().toString(),
  },
});

const bookingModel = mongoose.model("bookingModel", BookingSchema);
export default bookingModel;
