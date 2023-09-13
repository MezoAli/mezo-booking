import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "users",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "rooms",
    },
    chechInDate: {
      type: Date,
      require: true,
    },
    chechOutDate: {
      type: Date,
      require: true,
    },
    daysOfStay: {
      type: Number,
      require: true,
    },
    amountPaid: {
      type: Number,
      require: true,
    },
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
    paidAt: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.bookings || mongoose.model("bookings", bookingSchema);

export default Booking;
