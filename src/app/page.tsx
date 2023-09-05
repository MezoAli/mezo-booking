import RoomsGrid from "@/components/RoomsGrid";
import PaddingContainer from "../components/PaddingContainer";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";

interface HomePageProps {
  params: {};
  searchParams: {
    page: string;
    location?: string;
    category?: string;
  };
}

const getAllRooms = async (
  pageNum: string = "1",
  location: string = "",
  category: string = ""
) => {
  try {
    const response = await fetch(
      `${process.env.SITE_URL}/api/rooms?page=${pageNum}&location=${location}&category=${category}`,
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
  const session = await getServerSession(OPTIONS);
  console.log("session home page: ", session);

  const data = await getAllRooms(
    searchParams.page,
    searchParams.location,
    searchParams.category
  );

  return (
    <PaddingContainer>
      <div className="flex justify-between items-center text-2xl my-6">
        {searchParams.location ? (
          <h3 className="font-semibold">
            All Rooms in {searchParams.location}
          </h3>
        ) : (
          <h3 className="font-semibold">All Rooms</h3>
        )}
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
