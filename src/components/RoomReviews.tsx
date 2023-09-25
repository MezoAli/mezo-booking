"use client";
import axios from "axios";
import RoomRating from "./RoomRating";
import { IReview } from "@/models/roomModel";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

interface RoomReviewsProps {
  reviews: IReview[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  roomId: string;
}

const RoomReviews = ({ reviews, setIsOpen, roomId }: RoomReviewsProps) => {
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    const getCanReview = async () => {
      const response = await axios.get("/api/reviews/canReview", {
        params: { roomId },
      });
      console.log(response.data);
      setCanReview(response.data.canReview);
    };

    getCanReview();
  }, []);
  return (
    <div className="flex gap-4 flex-col items-start justify-start w-full my-4 border-t py-5">
      {canReview ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3 rounded-md text-white bg-sky-500 hover:bg-sky-900 transition duration-150 ease-in-out"
        >
          Submit Review
        </button>
      ) : (
        <p className="bg-red-400 text-white w-full rounded-md text-center py-2 font-semibold">
          you can not submit review untill you have a booking in that room
        </p>
      )}
      <div className="text-xl font-semibold">{reviews.length} Reviews</div>
      <div className="flex flex-col w-full gap-3">
        {reviews?.map((review) => {
          return (
            <div
              className="flex gap-4 border-b py-3 items-start"
              key={review._id}
            >
              <div className="h-10 w-10 bg-gray-500 rounded-full relative">
                <Image
                  src={review.user?.avatar?.url}
                  alt={review.user?.name}
                  className="rounded-full"
                  fill
                />
              </div>
              <div>
                <RoomRating rating={review.rating} />
                <h3 className="text-sm text-gray-400">
                  by {review?.user?.name}
                </h3>
                <p>{review.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomReviews;
