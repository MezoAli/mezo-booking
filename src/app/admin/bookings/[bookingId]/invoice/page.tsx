import InvoiceDetails from "@/components/InvoiceDetails";
import axios from "axios";
import { notFound } from "next/navigation";

interface UpdateRoomPageProps {
  params: {
    bookingId: string;
  };
}

const getBookingData = async (bookingId: string) => {
  const response = await axios.get(
    `${process.env.SITE_URL}/api/admin/bookings/${bookingId}`
  );
  return response?.data;
};

const InvoicePage = async ({ params }: UpdateRoomPageProps) => {
  const bookingData = await getBookingData(params?.bookingId);
  console.log(bookingData);

  if (!bookingData?.booking) {
    notFound();
  }

  return <InvoiceDetails booking={bookingData.booking} />;
};

export default InvoicePage;
