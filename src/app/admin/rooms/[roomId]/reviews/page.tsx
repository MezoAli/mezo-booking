import AdminReviews from "@/components/admin/AdminReviews";
import axios from "axios";
import { notFound } from "next/navigation";

interface getRoomReview {
  params: {
    roomId: string;
  };
}

const getRoomReview = async (roomId: string) => {
  const response = await axios.get(
    `${process.env.SITE_URL}/api/admin/rooms/${roomId}`
  );
  return response?.data;
};

const RoomReviewPage = async ({ params }: getRoomReview) => {
  const roomData = await getRoomReview(params?.roomId);

  if (!roomData?.room) {
    notFound();
  }

  return <AdminReviews room={roomData?.room} />;
};

export default RoomReviewPage;
