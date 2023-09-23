"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IBooking } from "@/models/bookingModel";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface InvoiceProps {
  booking: IBooking;
}

const InvoiceDetails = ({ booking }: InvoiceProps) => {
  const [loading, setLoading] = useState(false);
  const handleDownload = () => {
    setLoading(true);
    const input = document.getElementById("booking_invoice");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 0, 0, pdfWidth, 0);
        pdf.save(`invoice_${booking?._id}.pdf`);
        setLoading(false);
      });
    }
  };

  return (
    <div className="my-5">
      <div className="flex justify-center items-center my-4">
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded-md text-xl hover:bg-green-800 transition duration-150 ease-in-out"
        >
          {loading ? "Downloading..." : "Download Invoice"}
        </button>
      </div>
      <div className="px-5" id="booking_invoice">
        <div className="px-4 border shadow-md">
          <header className="">
            <div className="my-4 flex justify-center items-center">
              <Image
                alt="mezo-booking-logo"
                src="/images/bookit_logo.png"
                width={150}
                height={150}
              />
            </div>
            <h1 className="text-center border bg-gray-300 py-3 font-bold text-2xl">
              INVOICE # {booking?._id}
            </h1>
            <div className="flex justify-between items-center">
              <div>
                <div>Mezo-Booking</div>
                <div>
                  15, Assiut Thani,
                  <br />
                  71511, Egypt
                </div>
                <div>(+2) 01007176747</div>
                <div className="text-blue-500 hover:underline">
                  <Link href="mailto:moutaz.ali.dev@gmail.com">
                    info@mezobooking.com
                  </Link>
                </div>
              </div>
              <div>
                <div>
                  <span>Name : </span> {booking?.user?.name}
                </div>
                <div>
                  <span>EMAIL : </span> {booking?.user?.email}
                </div>

                <div>
                  <span>Status : </span>
                  {booking?.paymentInfo?.status === "paid"
                    ? "Paid"
                    : "Not Paid"}
                </div>
              </div>
            </div>
          </header>
          <main className="w-full">
            <table className="w-full text-sm text-left text-gray-500 overflow-x-scroll my-4">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price Per Night
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Check In Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Check Out Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Days of Stay
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4">{booking?.room?.name}</td>
                  <td className="px-6 py-4">${booking?.room?.pricePerNight}</td>
                  <td className="px-6 py-4">
                    {new Date(booking?.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(booking?.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{booking?.daysOfStay}</td>
                </tr>
                <tr className="my-4 bg-white border-b">
                  <td colSpan={4} className="px-6 py-4">
                    <b>GRAND TOTAL</b>
                  </td>
                  <td className="px-6 py-4">${booking?.amountPaid}</td>
                </tr>
              </tbody>
            </table>
            <div>
              <div>NOTICE:</div>
              <div>
                A finance charge of 1.5% will be made on unpaid balances after
                30 days.
              </div>
            </div>
          </main>
          <footer>
            Invoice was created on a computer and is valid without the
            signature.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
