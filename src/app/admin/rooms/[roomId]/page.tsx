import UpdateRoomForm from "@/components/admin/UpdateRoom";
import axios from "axios";
import { notFound } from "next/navigation";

interface UpdateRoomPageProps {
  params: {
    roomId: string;
  };
}

const getRoomData = async (roomId: string) => {
  const response = await axios.get(
    `${process.env.SITE_URL}/api/admin/rooms/${roomId}`
  );
  return response?.data;
};

const UpdateRoomPage = async ({ params }: UpdateRoomPageProps) => {
  const roomData = await getRoomData(params?.roomId);

  if (!roomData?.room) {
    notFound();
  }

  return <UpdateRoomForm room={roomData?.room} />;
};

export default UpdateRoomPage;
