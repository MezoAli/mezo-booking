import connectDB from "@/config/connectDB";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const rooms = await Room.find();
    return NextResponse.json(
      { message: "Get Rooms Successfully", rooms },
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
