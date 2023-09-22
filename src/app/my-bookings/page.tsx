import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import axios from "axios";
import PaddingContainer from "@/components/PaddingContainer";
import MyBookingsTable from "@/components/MyBookingsTable";

const getUserBookings = async (userId: string) => {
  const response = await axios.get(`${process.env.SITE_URL}/api/booking/me`, {
    params: { userId },
  });

  return response.data?.userBookings;
};

const MyBookings = async () => {
  const session = await getServerSession(OPTIONS);
  const userBookings = await getUserBookings(session?.user?._id as string);

  return (
    <PaddingContainer>
      <h2 className="text-2xl font-semibold my-3">My Bookings</h2>
      <MyBookingsTable bookings={userBookings} />
    </PaddingContainer>
  );
};

export default MyBookings;
