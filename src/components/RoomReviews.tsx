import RoomRating from "./RoomRating";
import { IReview } from "@/models/roomModel";
import { Dispatch, SetStateAction } from "react";

interface RoomReviewsProps {
  reviews: IReview[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const RoomReviews = ({ reviews, setIsOpen }: RoomReviewsProps) => {
  return (
    <div className="flex gap-4 flex-col items-start justify-start w-full my-4 border-t py-5">
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-3 rounded-md text-white bg-sky-500 hover:bg-sky-900 transition duration-150 ease-in-out"
      >
        Submit Review
      </button>
      <div className="text-xl font-semibold">{reviews.length} Reviews</div>
      <div className="flex flex-col w-full gap-3">
        {reviews?.map((review) => {
          return (
            <div className="flex gap-4 border-b py-3 items-start">
              <div className="h-10 w-10 bg-gray-500 rounded-full" />
              <div>
                <RoomRating rating={review.rating} />
                <h3 className="text-sm text-gray-400">by {"Moutaz"}</h3>
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
