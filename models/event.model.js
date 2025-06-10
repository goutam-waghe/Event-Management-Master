import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryModel",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
});

const EventModel =
  mongoose.models.EventModel || mongoose.model("EventModel", eventSchema);
export default EventModel;
