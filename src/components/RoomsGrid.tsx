"use client";
import React, { useEffect } from "react";
import RoomCard from "./RoomCard";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { addAllRooms } from "@/redux/slices/roomsSlice";
import Pagination from "react-js-pagination";
import { useRouter, useSearchParams } from "next/navigation";

const RoomsGrid = ({ data }: any) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const location = searchParams.get("location");
  const category = searchParams.get("category");
  const router = useRouter();
  const pageNumber = Number(page) || 1;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      addAllRooms({
        rooms: data?.rooms,
        totalRoomsCount: data?.totalRoomsCount,
        filteredRoomsCount: data?.filteredRoomsCount,
        roomsPerPage: data?.roomsPerPage,
      })
    );
  }, [data, dispatch]);

  const handlePagination = (pageNum: number) => {
    let link = `/?page=${pageNum}`;
    if (location || category) {
      link = `/?page=${pageNum}&location=${location}&category=${category}`;
    }
    router.push(link);
  };
  return (
    <>
      {data?.rooms?.length === 0 && (
        <div className="text-center text-2xl text-red-600 my-8">
          <p>No Rooms Found</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {data?.rooms?.map((room: any) => {
          return <RoomCard key={room._id} room={room} />;
        })}
      </div>
      <div className="flex justify-center items-center w-full my-[30px]">
        <Pagination
          activePage={pageNumber}
          itemsCountPerPage={data?.roomsPerPage}
          totalItemsCount={data?.totalRoomsCount}
          onChange={handlePagination}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="First"
          lastPageText="Last"
        />
      </div>
    </>
  );
};

export default RoomsGrid;
