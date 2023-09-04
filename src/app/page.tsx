import RoomsGrid from "@/components/RoomsGrid";
import PaddingContainer from "../components/PaddingContainer";

interface HomePageProps {
  params: {};
  searchParams: {
    page: string;
  };
}

const getAllRooms = async (pageNum: string = "1") => {
  try {
    const response = await fetch(
      `${process.env.SITE_URL}/api/rooms?page=${pageNum}`,
      {
        next: {
          revalidate: 120,
          tags: ["rooms"],
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error };
  }
};

export default async function Home({ params, searchParams }: HomePageProps) {
  console.log(searchParams);

  const data = await getAllRooms(searchParams.page);

  return (
    <PaddingContainer>
      <RoomsGrid data={data} />
    </PaddingContainer>
  );
}
