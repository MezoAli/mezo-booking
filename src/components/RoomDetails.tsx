"use client";
import { Room } from "@/types/roomTypes";
import PaddingContainer from "./PaddingContainer";
import { AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RoomFeatures from "./RoomFeatures";

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

        <div className="flex flex-col md:flex-row gap-5 justify-between items-center flex-nowrap">
          <div>
            <div className="font-semibold text-xl mb-4">Description</div>
            <div className="text-md text-gray-600">{room.description}</div>
          </div>
          <div className="w-full">
            <div className="border border-gray-600 rounded-md shadow-md bg-white py-4 px-10 flex flex-col items-center justify-center gap-4">
              <div>$ {room.pricePerNight} / Night</div>
              <button className="bg-blue-500 rounded-md px-3 py-2 w-full">
                Pay
              </button>
            </div>
          </div>
        </div>

        <RoomFeatures room={room} />
      </div>
    </PaddingContainer>
  );
};

export default RoomDetails;
