import { Room } from "@/types/roomTypes";
import Image from "next/image";
import Link from "next/link";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Image
        width={150}
        height={150}
        alt="downtown"
        className="rounded-sm w-full h-[200px]"
        src="https://a0.muscache.com/im/pictures/4599de32-549f-4125-8c93-ef99ce5b4cb0.jpg?im_w=720"
      />

      <div className="flex flex-col gap-2">
        <h5 className="text-xl">
          <Link href={`/rooms/`}>{room?.name}</Link>
        </h5>
        <p className="text-md">
          <b>${room?.pricePerNight}</b> / night
        </p>
        {/* <StarsRating /> */}
        <span id="no_of_reviews">({room?.reviews?.length} Reviews)</span>

        <Link
          className="bg-blue-400 rounded-md px-3 py-2 w-full text-center"
          href="#"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
