import PaddingContainer from "@/components/PaddingContainer";
import BookingDetails from "@/components/BookingDetails";
import axios from "axios";

interface BookingDetailsProps {
  params: {
    bookingId: string;
  };
}

const getBookingDetails = async (id: string) => {
  const response = await axios.get(`${process.env.SITE_URL}/api/booking`, {
    params: { bookingId: id },
  });
  return response.data;
};

const BookindDetailsPage = async ({ params }: BookingDetailsProps) => {
  const data = await getBookingDetails(params.bookingId);
  console.log(data);

  return (
    <PaddingContainer>
      <BookingDetails booking={data.booking} />
    </PaddingContainer>
  );
};

export default BookindDetailsPage;
