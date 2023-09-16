"use client";
import PaddingContainer from "./PaddingContainer";
import { AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RoomFeatures from "./RoomFeatures";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import { RoomDocument } from "@/models/roomModel";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import StarRatings from "react-star-ratings";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

interface RoomDetailsProps {
  room: RoomDocument;
}

const RoomDetails = ({ room }: RoomDetailsProps) => {
  const [rating, setRating] = useState(room?.ratings);
  useEffect(() => {
    const setMap = async () => {
      const coordinates = room?.location?.coordinates;
      const map = new mapboxgl.Map({
        container: "room-map",
        style: "mapbox://styles/mapbox/streets-v11",
        zoom: 12,
        center: coordinates,
      });

      new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    };
    if (room?.location) {
      setMap();
    }
  }, []);
  console.log(room?.location?.coordinates);

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
              {/* {[...Array(5)].map((index) => {
                return (
                  <div key={index}>
                    <AiOutlineStar />
                  </div>
                );
              })} */}
              {room?.ratings && (
                <StarRatings
                  rating={rating}
                  starRatedColor="#EC194E"
                  // changeRating={this.changeRating}
                  starDimension="30px"
                  numberOfStars={5}
                />
              )}
            </div>
          </div>
          <div>{room?.numOfReviews} Reviews</div>
        </div>

        <Carousel showThumbs={false}>
          {room?.images?.map((item) => {
            return (
              <div key={item.public_id}>
                <Image
                  width={1280}
                  height={600}
                  alt="room"
                  className="rounded-md"
                  src={item.url}
                />
                <p className="legend">Legend 1</p>
              </div>
            );
          })}
        </Carousel>

        <div className="flex flex-col md:flex-row gap-5 justify-between items-center flex-nowrap">
          <div>
            <div className="font-semibold text-xl mb-4">Description</div>
            <div className="text-md text-gray-600">{room.description}</div>
          </div>

          <div className="w-full">
            <div className="border border-gray-600 rounded-md shadow-md bg-white py-4 px-10 flex flex-col items-center justify-center gap-4">
              <div>$ {room.pricePerNight} / Night</div>
              <button className="bg-blue-400 hover:text-white hover:font-semibold transition hover:bg-blue-700 duration-150 ease-in-out rounded-md px-3 py-2 w-full">
                Pay
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-between items-center w-full">
          <RoomFeatures room={room} />
          {room?.location && (
            <div
              id="room-map"
              className="w-full min-h-[300px] rounded-md shadow-md bg-gray-300"
            ></div>
          )}
        </div>
      </div>
    </PaddingContainer>
  );
};

export default RoomDetails;
