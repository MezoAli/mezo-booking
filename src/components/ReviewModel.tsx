import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, Dispatch, SetStateAction } from "react";
import StarRatings from "react-star-ratings";

interface ReviewModelProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  roomId: any;
}

const ReviewModel = ({ isOpen, setIsOpen, roomId }: ReviewModelProps) => {
  function closeModal() {
    setIsOpen(false);
  }

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleAddReview = async () => {};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[80]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6  align-middle space-y-4 shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Review
                </Dialog.Title>
                <div className="w-full flex flex-col gap-3 items-start justify-start">
                  <label className="text-sm font-semibold">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    cols={30}
                    rows={5}
                    placeholder="Enter Your Comment"
                    className="w-full border focus:outline-none p-4 rounded-md placeholder:text-sm"
                  ></textarea>
                </div>

                <StarRatings
                  rating={rating}
                  starRatedColor="#EC194E"
                  changeRating={(e: SetStateAction<number>) => setRating(e)}
                  starDimension="30px"
                  numberOfStars={5}
                />

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Submit Review
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewModel;
