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

const UpdateRoomPage = async ({ params }: UpdateRoomPageProps) => {
  const bookingData = await getBookingData(params?.bookingId);

  //   if (!bookingData?.booking) {
  //     notFound();
  //   }

  return <div>{params.bookingId}</div>;
};

export default UpdateRoomPage;
