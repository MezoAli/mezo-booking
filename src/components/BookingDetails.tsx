import { IBooking } from "@/models/bookingModel";
import Image from "next/image";
import Link from "next/link";

interface BookingDetailsProps {
  booking: IBooking;
}
const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const isPaid = booking?.paymentInfo?.status === "paid" ? true : false;
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 booking-details">
          <div className="flex justify-between items-center my-5">
            <h2 className="text-2xl font-semibold">Booking # {booking?._id}</h2>
            <Link
              className="px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-900 transition duration-150 ease-out"
              href={`/my-bookings/invoice/${booking?._id}`}
            >
              Invoice
            </Link>
          </div>

          <h4 className="mt-5 mb-4 font-lg font-semibold">User Info</h4>
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
              <tr>
                <th scope="row">Name:</th>
                <td>{booking?.user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Email:</th>
                <td>{booking?.user?.email}</td>
              </tr>
              <tr>
                <th scope="row">Amount Paid:</th>
                <td>${booking?.amountPaid}</td>
              </tr>
            </tbody>
          </table>

          <h4 className="mt-5 mb-4 font-lg font-semibold">Booking Info</h4>
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
              <tr>
                <th scope="row">Check In:</th>
                <td>
                  {new Date(booking?.checkInDate).toLocaleDateString()} - 2:00
                  PM
                </td>
              </tr>
              <tr>
                <th scope="row">Check Out:</th>
                <td>
                  {new Date(booking?.checkOutDate).toLocaleDateString()} - 12:00
                  PM
                </td>
              </tr>
              <tr>
                <th scope="row">Days of Stay:</th>
                <td>{booking?.daysOfStay}</td>
              </tr>
            </tbody>
          </table>

          <h4 className="mt-5 mb-4 font-lg font-semibold">Payment Info:</h4>
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
              <tr>
                <th scope="row">Status:</th>
                <td>
                  <b className={isPaid ? "text-green-600" : "text-red-600"}>
                    {isPaid ? "Paid" : "Not Paid"}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>

          <h4 className="mt-5 mb-4 font-lg font-semibold">Booked Room:</h4>

          <hr />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5 w-full">
            <div className="flex flex-col gap-2">
              <div>
                <Image
                  src={booking?.room?.images[0]?.url}
                  alt={booking?.room?.name}
                  height="45"
                  width="65"
                  className="rounded-md"
                />
              </div>

              <div className="hover:underline text-blue-600">
                <Link href={`/rooms/${booking?.room?._id}`}>
                  {booking?.room?.name}
                </Link>
              </div>
            </div>

            <div>
              <p>${booking?.room?.pricePerNight} / per Night</p>
            </div>

            <div>
              <p>{booking?.daysOfStay} Day(s)</p>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
