import RoomsGrid from "@/components/RoomsGrid";
import PaddingContainer from "../components/PaddingContainer";

const getAllRooms = async () => {
  try {
    const response = await fetch(`${process.env.SITE_URL}/api/rooms`, {
      next: {
        revalidate: 120,
        tags: ["rooms"],
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export default async function Home() {
  const data = await getAllRooms();
  console.log(data);

  return (
    <PaddingContainer>
      <RoomsGrid data={data} />
    </PaddingContainer>
  );
}
