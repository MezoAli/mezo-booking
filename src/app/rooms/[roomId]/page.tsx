import RoomDetails from "@/components/RoomDetails";
import { Room } from "@/types/roomTypes";
import { notFound } from "next/navigation";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

const getRoomData = async (roomId: string) => {
  try {
    const response = await fetch(`${process.env.SITE_URL}/api/rooms/${roomId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export async function generateStaticParams() {
  const response = await fetch(`${process.env.SITE_URL}/api/rooms`, {
    next: {
      revalidate: 120,
      tags: ["room"],
    },
  });
  const data = await response.json();
  return data?.rooms?.map((room: Room) => ({
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
