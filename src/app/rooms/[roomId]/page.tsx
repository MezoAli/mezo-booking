import { Room } from "@/types/roomTypes";

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
  const response = await fetch("http://localhost:3000/api/rooms");
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
  const room = await getRoomData(roomId);
  console.log(room);

  return <div>room Id {roomId}</div>;
};

export default RoomPage;
