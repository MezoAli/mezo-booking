"use client";
import { Rooms } from "@/types/roomTypes";
import React, { useEffect } from "react";
import RoomCard from "./RoomCard";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { addAllRooms } from "@/redux/slices/roomsSlice";

interface RoomGridProps {
  data: Rooms;
}

const RoomsGrid = ({ data }: RoomGridProps) => {
  const dispatch = useAppDispatch();
  const roomsData = useAppSelector((state) => state.rooms);
  console.log("data from redux : ", roomsData);
  useEffect(() => {
    dispatch(
      addAllRooms({
        rooms: data.rooms,
        totalRoomsCount: data.totalRoomsCount,
        filteredRoomsCount: data.filteredRoomsCount,
        roomsPerPage: data.roomsPerPage,
      })
    );
  }, [data]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {data?.rooms?.length === 0 && (
        <div className="text-center text-3xl text-red-600">
          <p>No Rooms Found</p>
        </div>
      )}
      {data.rooms?.map((room: any) => {
        return <RoomCard key={room._id} room={room} />;
      })}
    </div>
  );
};

export default RoomsGrid;
