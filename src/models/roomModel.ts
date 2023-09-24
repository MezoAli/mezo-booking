import geocoder from "../lib/geocoder";
import mongoose, { Document, Schema, Types } from "mongoose";

interface Location {
  type: "Point";
  coordinates: [number, number];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  comment: string;
  rating: number;
}

interface Image {
  public_id: string;
  url: string;
}

export interface RoomDocument extends Document {
  name: string;
  pricePerNight: number;
  description: string;
  address: string;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakfast: boolean;
  isAirConditioned: boolean;
  isPetsAllowed: boolean;
  isRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  category: "Single" | "Twins" | "King";
  user?: mongoose.Schema.Types.ObjectId | null;
  location: Location;
  reviews: IReview[];
  images: Image[];
}

const roomSchema = new mongoose.Schema<RoomDocument>(
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

roomSchema.pre("save", async function (next) {
  const result = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [result[0].longitude, result[0].latitude],
    formattedAddress: result[0].formattedAddress,
    city: result[0].city,
    state: result[0].stateCode,
    zipCode: result[0].zipcode,
    country: result[0].countryCode,
  };
});

const Room = mongoose.models.rooms || mongoose.model("rooms", roomSchema);

export default Room;
