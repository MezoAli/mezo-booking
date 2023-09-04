import RoomsGrid from "@/components/RoomsGrid";
import PaddingContainer from "../components/PaddingContainer";
import Link from "next/link";

interface HomePageProps {
  params: {};
  searchParams: {
    page: string;
    location?: string;
  };
}

const getAllRooms = async (pageNum: string = "1", location: string = "") => {
  try {
    const response = await fetch(
      `${process.env.SITE_URL}/api/rooms?page=${pageNum}&location=${location}`,
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

  const data = await getAllRooms(searchParams.page, searchParams.location);

  return (
    <PaddingContainer>
      <div className="flex justify-between items-center text-2xl my-6">
        <h3 className="font-semibold">All Rooms</h3>
        <Link
          href="/search"
          className="underline underline-offset-2 text-[#EC194E] mb-4"
        >
          Search Room
        </Link>
      </div>

      <RoomsGrid data={data} />
    </PaddingContainer>
  );
}
