import { RoomDocument } from "@/models/roomModel";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import RoomRating from "./RoomRating";

interface RoomCardProps {
  room: RoomDocument;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const roomRatings = room.ratings;
  return (
    <div className="flex flex-col gap-3 shadow-sm">
      <Image
        width={150}
        height={150}
        alt={room.name}
        className="rounded-md aspect-square w-full"
        src={room.images[0].url}
      />

      <div className="flex flex-col gap-2 justify-start">
        <h5 className="text-sm md:text-md lg:text-lg truncate">{room?.name}</h5>
        <p className="text-md">
          <b>${room?.pricePerNight}</b> / night
        </p>
        <div className="flex gap-2 justify-center items-center">
          {room?.ratings && <RoomRating rating={room?.ratings} />}
        </div>
        <span id="no_of_reviews">({room?.reviews?.length} Reviews)</span>

        <Link
          className="bg-[#EC194E] rounded-md px-3 py-2 w-fit text-center text-white"
          href={`/rooms/${room._id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
