import RoomDetails from "@/components/RoomDetails";
import { Room } from "@/types/roomTypes";
import { notFound } from "next/navigation";
import axios from "axios";
interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export const revalidate = 120;

const getRoomData = async (roomId: string) => {
  try {
    const response = await axios.get(
      `${process.env.SITE_URL}/api/rooms/${roomId}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export async function generateStaticParams() {
  const response = await axios.get(`${process.env.SITE_URL}/api/rooms`);
  return response.data?.rooms?.map((room: Room) => ({
    roomId: room?._id,
  }));
}

export async function generateMetadata({ params: { roomId } }: RoomPageProps) {
  const roomData = await getRoomData(roomId);
  const room: Room = roomData.room;
  return {
    title: room?.name,
    description: room?.description,
  };
}

const RoomPage = async ({ params: { roomId } }: RoomPageProps) => {
  const roomData = await getRoomData(roomId);
  const room: Room = roomData.room;
  console.log(room);
  if (!room) {
    notFound();
  }

  return <RoomDetails room={room} />;
};

export default RoomPage;
