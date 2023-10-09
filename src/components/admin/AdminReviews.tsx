"use client";
import axios from "axios";
import { IReview, RoomDocument } from "@/models/roomModel";
import Image from "next/image";
import { useState } from "react";
import RoomRating from "../RoomRating";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface RoomReviewsProps {
  room: RoomDocument;
}

const AdminReviews = ({ room }: RoomReviewsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const handleDeleteReview = async (reviewId: string) => {
    try {
      setIsLoading(true);
      setReviewId(reviewId);
      const response = await axios.patch(
        `/api/admin/rooms/${room?._id}/delete_reviews?reviewId=${reviewId}`
      );
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
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
              <button
                onClick={() => handleDeleteReview(review?._id)}
                className="px-4 text-xl py-2 bg-brand rounded-md text-white hover:bg-red-900 transition duration-150 ease-in-out"
              >
                {reviewId === review?._id && isLoading ? (
                  "Deleting..."
                ) : (
                  <BsTrash />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminReviews;
