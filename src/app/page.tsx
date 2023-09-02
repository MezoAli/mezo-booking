import { Room } from "@/types/roomTypes";
import PaddingContainer from "../components/PaddingContainer";
import RoomCard from "../components/RoomCard";

// const getAllRooms = async () => {
//   try {
//     const response = await fetch(`${process.env.SITE_URL}/api/rooms`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return { error };
//   }
// };

export default async function Home() {
  // const { rooms } = await getAllRooms();

  return (
    <PaddingContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* {rooms?.map((room: any) => {
          return <RoomCard key={room._id} room={room} />;
        })} */}
      </div>
    </PaddingContainer>
  );
}
