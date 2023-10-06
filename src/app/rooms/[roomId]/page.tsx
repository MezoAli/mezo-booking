import RoomDetails from "@/components/RoomDetails";
import { notFound } from "next/navigation";
import axios from "axios";
import { RoomDocument } from "@/models/roomModel";
interface RoomPageProps {
  params: {
    roomId: string;
  };
}

const getRoomData = async (roomId: string) => {
  try {
    const response = await fetch(
      `${process.env.SITE_URL}/api/rooms/${roomId}`,
      {
        next: {
          tags: ["roomDetails"],
          revalidate: 60,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export async function generateStaticParams() {
  const response = await axios.get(`${process.env.SITE_URL}/api/rooms`);
  return response.data?.rooms?.map((room: RoomDocument) => ({
    roomId: room?._id,
  }));
}

export async function generateMetadata({ params: { roomId } }: RoomPageProps) {
  const roomData = await getRoomData(roomId);
  const room: RoomDocument = roomData?.room;
  return {
    title: room?.name,
    description: room?.description,
  };
}

const RoomPage = async ({ params: { roomId } }: RoomPageProps) => {
  const roomData = await getRoomData(roomId);
  console.log(roomData);

  const room: RoomDocument = roomData?.room;
  console.log(room);
  if (!room) {
    notFound();
  }

  return <RoomDetails room={room} />;
};

export default RoomPage;
