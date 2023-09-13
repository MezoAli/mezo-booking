import RoomsGrid from "@/components/RoomsGrid";
import PaddingContainer from "../components/PaddingContainer";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { OPTIONS } from "./api/auth/[...nextauth]/route";
import axios from "axios";

interface HomePageProps {
  params: {};
  searchParams: {
    page: string;
    location?: string;
    category?: string;
  };
}

export const revalidate = 120;
export const dynamic = "force-dynamic";

const getAllRooms = async (
  pageNum: string = "1",
  location: string = "",
  category: string = ""
) => {
  try {
    const response = await axios.get(
      `${process.env.SITE_URL}/api/rooms?page=${pageNum}&location=${location}&category=${category}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export default async function Home({ params, searchParams }: HomePageProps) {
  const session = await getServerSession(OPTIONS);

  const data = await getAllRooms(
    searchParams.page,
    searchParams.location,
    searchParams.category
  );

  // console.log(data);

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
