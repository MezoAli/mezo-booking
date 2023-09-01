import connectDB from "@/config/connectDB";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location");
    const category = searchParams.get("category");

    const searchFilter: any = {};

    if (location) {
      searchFilter.address = { $regex: location, $options: "i" };
    }

    if (category) {
      searchFilter.category = { $regex: category, $options: "i" };
    }

    const rooms = await Room.find(searchFilter);
    return NextResponse.json(
      { message: "Get Rooms Successfully", rooms, count: rooms?.length },
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
