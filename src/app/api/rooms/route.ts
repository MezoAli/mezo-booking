import connectDB from "@/config/connectDB";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location");
    const category = searchParams.get("category");
    const page = searchParams.get("page");
    const CurrentPageNumber = Number(page) || 1;
    const roomsPerPage = 4;
    const skip = roomsPerPage * (CurrentPageNumber - 1);

    const searchFilter: any = {};

    if (location) {
      searchFilter.address = { $regex: location, $options: "i" };
    }

    if (category) {
      searchFilter.category = { $regex: category, $options: "i" };
    }

    const totalRoomsCount = await Room.countDocuments();

    const rooms = await Room.find(searchFilter).limit(roomsPerPage).skip(skip);

    const filteredRoomsCount = rooms?.length;

    return NextResponse.json(
      {
        message: "Get Rooms Successfully",
        rooms,
        totalRoomsCount,
        filteredRoomsCount,
        roomsPerPage,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const room = await Room.create(reqBody);
    return NextResponse.json(
      { message: "Room Created Successfully", room },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
