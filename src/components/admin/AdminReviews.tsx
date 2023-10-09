"use client";
import axios from "axios";
import { IReview, RoomDocument } from "@/models/roomModel";
import Image from "next/image";
import { useState } from "react";
import RoomRating from "../RoomRating";
import { BsTrash } from "react-icons/bs";

interface RoomReviewsProps {
  room: RoomDocument;
}

const AdminReviews = ({ room }: RoomReviewsProps) => {
  return (
    <div className="flex gap-4 flex-col items-start justify-start w-full my-4 border-t py-5">
      <div className="text-sm md:text-xl font-semibold">
        Reviews for {room?.name}
      </div>
      <div className="font-semibold">{room?.reviews.length} Reviews</div>
      <div className="flex flex-col w-full gap-3">
        {room?.reviews?.map((review: IReview) => {
          return (
            <div
              className="flex gap-4 border-b py-3 items-between justify-between"
              key={review._id}
            >
              <div>
                <div className="h-10 w-10 bg-gray-500 rounded-full relative">
                  <Image
                    src={review.user?.avatar?.url}
                    alt={review.user?.name}
                    className="rounded-full"
                    fill
                  />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">
                    by {review?.user?.name}
                  </h3>
                  <RoomRating rating={review.rating} />
                  <p>{review.comment}</p>
                </div>
              </div>
              <div className="text-xl text-brand cursor-pointer">
                <BsTrash />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminReviews;
