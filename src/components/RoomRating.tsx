"use client";
import StarRatings from "react-star-ratings";
import { useState } from "react";

const RoomRating = ({ rating }: { rating: number }) => {
  const [roomRating, setRoomRating] = useState(rating);
  return (
    <StarRatings
      rating={roomRating}
      starRatedColor="#EC194E"
      // changeRating={this.changeRating}
      starDimension="20px"
      numberOfStars={5}
    />
  );
};

export default RoomRating;
