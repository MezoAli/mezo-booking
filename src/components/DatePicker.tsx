"use client";

import { RoomDocument } from "@/models/roomModel";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

interface DatePickerProps {
  room: RoomDocument;
}

const DatePickerComponent = ({ room }: DatePickerProps) => {
  const { data: session } = useSession();
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
  };

  const handleBooking = async () => {
    const reqBody = {
      room: room?._id,
      user: session?.user?._id,
      checkInDate,
      checkOutDate,
      paidAt: new Date(),
      daysOfStay: 3,
      amountPaid: 3 * room?.pricePerNight,
      paymentInfo: {
        id: "12345678",
        status: "success",
      },
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/booking", reqBody);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
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
        <button
          onClick={handleBooking}
          disabled={loading}
          className="bg-blue-400 hover:text-white hover:font-semibold transition hover:bg-blue-700 duration-150 ease-in-out rounded-md px-3 py-2 w-full"
        >
          {loading ? "Loading..." : "Pay"}
        </button>
      </div>
    </>
  );
};

export default DatePickerComponent;
