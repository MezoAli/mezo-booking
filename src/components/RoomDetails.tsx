"use client";
import { Room } from "@/types/roomTypes";
import PaddingContainer from "./PaddingContainer";
import { AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface RoomDetailsProps {
  room: Room;
}

const RoomDetails = ({ room }: RoomDetailsProps) => {
  return (
    <PaddingContainer>
      <div className="flex flex-col gap-4 my-5 justify-start items-start">
        <h2 className="text-xl font-bold">{room.name}</h2>

        <address className="text-md font-semibold text-gray-700">
          {room.address}
        </address>

        <div className="flex justify-center items-center gap-6">
          <div>
            <div className="flex gap-2 justify-center items-center text-yellow-600 text-lg">
              {[...Array(5)].map((index) => {
                return (
                  <div key={index}>
                    <AiOutlineStar />
                  </div>
                );
              })}
            </div>
          </div>
          <div>{room?.numberOfReviews} Reviews</div>
        </div>

        <Carousel showThumbs={false}>
          <div>
            <Image
              width={1280}
              height={600}
              alt={room.name}
              className="rounded-md"
              src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960"
            />
            <p className="legend">Legend 1</p>
          </div>
          <div>
            <Image
              width={1280}
              height={600}
              alt={room.name}
              className="rounded-md"
              src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960"
            />
            <p className="legend">Legend 2</p>
          </div>
          <div>
            <Image
              width={1280}
              height={600}
              alt={room.name}
              className="rounded-md"
              src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960"
            />
            <p className="legend">Legend 3</p>
          </div>
        </Carousel>
      </div>
    </PaddingContainer>
  );
};

export default RoomDetails;
