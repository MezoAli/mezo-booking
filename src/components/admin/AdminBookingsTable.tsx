"use client";
import { IBooking } from "@/models/bookingModel";
import Link from "next/link";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineDocument } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MyBookingsTableProps {
  bookings: IBooking[];
}

const AdminBookingsTable = ({ bookings }: MyBookingsTableProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const router = useRouter();
  const handleDeleteBooking = async (bookingId: string) => {
    try {
      setIsLoading(true);
      setBookingId(bookingId);
      const response = await axios.delete("/api/admin/bookings", {
        params: { bookingId },
      });
      toast.success(response.data.message);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 justify-start items-start">
      <h2 className="text-xl font-semibold">{bookings.length} Bookings</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {bookings.length === 0 && (
          <p className="text-3xl text-center my-4 font-semibold">
            You Do Not Have Any Bookings
          </p>
        )}
        {bookings.length > 0 && (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Booking Id
                </th>
                <th scope="col" className="px-6 py-3">
                  CheckIn Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Checkout Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Days Of Stay
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount Paid
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 truncate py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._id}
                    </th>
                    <td className="px-6 py-4">
                      {new Date(item.checkInDate).toLocaleDateString()} - 2:00
                      PM
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.checkOutDate).toLocaleDateString()} - 12:00
                      PM
                    </td>
                    <td className="px-6 py-4">{item.daysOfStay}</td>
                    <td className="px-6 py-4">{item.amountPaid}</td>
                    <td className="px-6 py-4 flex justify-between gap-3 items-center">
                      <Link
                        href={`/admin/bookings/${item._id}`}
                        className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-900 transition duration-150 ease-in-out"
                      >
                        <AiOutlineEye />
                      </Link>
                      <Link
                        href={`/admin/bookings/${item._id}/invoice`}
                        className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-900 transition duration-150 ease-in-out"
                      >
                        <HiOutlineDocument />
                      </Link>
                      <button
                        onClick={() => handleDeleteBooking(item._id)}
                        className="px-4 py-2 bg-brand rounded-md text-white hover:bg-red-900 transition duration-150 ease-in-out"
                      >
                        {bookingId === item._id && isLoading ? (
                          "Deleting..."
                        ) : (
                          <BsTrash />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBookingsTable;
