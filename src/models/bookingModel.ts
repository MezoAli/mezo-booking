import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Schema.Types.ObjectId;
  room: mongoose.Schema.Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  paidAt: Date;
  daysOfStay: number;
  amountPaid: number;
  paymentInfo: {
    id: string;
    status: string;
  };
}

const bookingSchema = new mongoose.Schema<IBooking>(
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
    checkInDate: {
      type: Date,
      require: true,
    },
    checkOutDate: {
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
  mongoose.models.bookings ||
  mongoose.model<IBooking>("bookings", bookingSchema);

export default Booking;
