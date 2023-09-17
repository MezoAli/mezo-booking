"use client";

import { RoomDocument } from "@/models/roomModel";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  room: RoomDocument;
}

const DatePickerComponent = ({ room }: DatePickerProps) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
  };
  return (
    <>
      <div className="border border-gray-600 rounded-md shadow-md bg-white py-4 px-10 flex flex-col items-center justify-center gap-4">
        <div className="text-lg">
          <b>$ {room.pricePerNight}</b> / Night
        </div>
        <div className="border-b w-full h-2 mb-4" />
        <DatePicker
          selected={checkInDate}
          onChange={onChange}
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={new Date()}
          //   excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
          selectsRange
          inline
        />
        <button className="bg-blue-400 hover:text-white hover:font-semibold transition hover:bg-blue-700 duration-150 ease-in-out rounded-md px-3 py-2 w-full">
          Pay
        </button>
      </div>
    </>
  );
};

export default DatePickerComponent;
