"use client";

import calculateDaysOfStay from "@/lib/calculateDaysOfStay";
import { RoomDocument } from "@/models/roomModel";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [daysOfStay, setDaysOfStay] = useState(0);
  const [loading, setLoading] = useState(false);
  const [roomAvalability, setRoomAvalability] = useState("");
  const [bookedDates, setBokedDates] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getBokedDates = async () => {
      const response = await axios.get("/api/booking/getBokedDates", {
        params: { roomId: room?._id },
      });
      console.log(response.data);
      const dates = response.data?.bookedDates.map(
        (item: any) => new Date(item)
      );
      setBokedDates(dates);
    };

    getBokedDates();
  }, []);

  const onChange = async (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);
      setDaysOfStay(days);
      const filters = {
        roomId: room?._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate?.toISOString(),
      };
      try {
        const response = await axios.get("/api/booking/check", {
          params: filters,
        });
        console.log(response.data);
        if (response.data.isAvailable) {
          setRoomAvalability("Available");
        } else {
          setRoomAvalability("Not Available");
        }
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  };

  const handleBooking = async () => {
    const reqBody = {
      room: room?._id,
      user: session?.user?._id,
      checkInDate,
      checkOutDate,
      paidAt: new Date(),
      daysOfStay,
      amountPaid: daysOfStay * room?.pricePerNight,
      paymentInfo: {
        id: "12345678",
        status: "success",
      },
    };

    try {
      setLoading(true);
      const response = await axios.post("/api/booking", reqBody);
      toast.success(response.data.message);
      router.push("/");
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
          // selected={checkInDate}
          onChange={onChange}
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={new Date()}
          excludeDates={bookedDates}
          selectsRange
          inline
        />
        {roomAvalability ? (
          <p
            className={`text-sm ${
              roomAvalability === "Available"
                ? "text-green-600"
                : "text-red-700"
            }`}
          >
            The Room Is {roomAvalability}
          </p>
        ) : (
          ""
        )}
        {roomAvalability === "Available" ? (
          <button
            onClick={handleBooking}
            disabled={loading}
            className="bg-blue-400 hover:text-white hover:font-semibold transition hover:bg-blue-700 duration-150 ease-in-out rounded-md px-3 py-2 w-full"
          >
            {loading ? "Loading..." : "Pay"}
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default DatePickerComponent;
