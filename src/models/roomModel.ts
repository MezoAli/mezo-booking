import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please Enter A Room Name"],
      trim: true,
      maxLength: [100, "Room Name can't be more than 100 characters"],
    },
    pricePerNight: {
      type: Number,
      require: [true, "Please Enter A Room Price"],
      maxLength: [5, "Room Price can't be more than 5 Numbers"],
      default: 0.0,
    },
    description: {
      type: String,
      require: [true, "Please Enter A Room Description"],
      trim: true,
    },
    address: {
      type: String,
      require: [true, "Please Enter A Room Address"],
      trim: true,
    },
    guestCapacity: {
      type: Number,
      require: [true, "Please Enter A Guest Capacity"],
      trim: true,
    },
    numOfBeds: {
      type: Number,
      require: [true, "Please Enter Number Of Beds"],
      trim: true,
    },
    isInternet: {
      type: Boolean,
      default: false,
    },
    isBreakfast: {
      type: Boolean,
      default: false,
    },
    isAirConditioned: {
      type: Boolean,
      default: false,
    },
    isPetsAllowed: {
      type: Boolean,
      default: false,
    },
    isRoomCleaning: {
      type: Boolean,
      default: false,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["Single", "Twins", "King"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          require: true,
        },
        name: {
          type: String,
          require: true,
        },
        comment: {
          type: String,
          require: true,
        },
        rating: {
          type: Number,
          require: true,
        },
      },
    ],
    images: [
      {
        public_id: {
          type: String,
          require: true,
        },
        url: {
          type: String,
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.models.rooms || mongoose.model("rooms", roomSchema);

export default Room;
