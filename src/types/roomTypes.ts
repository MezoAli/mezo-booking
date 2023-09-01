import { Document, Schema } from "mongoose";

interface RoomReview {
  user: Schema.Types.ObjectId;
  name: string;
  comment: string;
  rating: number;
}

interface RoomImage {
  public_id: string;
  url: string;
}

export interface Room extends Document {
  name: string;
  pricePerNight: number;
  description: string;
  address: string;
  guestCapacity: number;
  noOfBeds: number;
  internet: boolean;
  breakfast: boolean;
  airCondition: boolean;
  petsAllowed: boolean;
  roomCleaning: boolean;
  ratings: number;
  numberOfReviews: number;
  category?: "single" | "twins" | "king";
  user: Schema.Types.ObjectId;
  reviews: RoomReview[];
  images: RoomImage[];
}
