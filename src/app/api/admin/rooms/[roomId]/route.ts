import connectDB from "@/config/connectDB";
import Room from "@/models/roomModel";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const room = await Room.findById(params.roomId);

    if (!room) {
      throw new Error("No Room Found");
    }

    return NextResponse.json(
      { message: "get room successfully", room },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
