import connectDB from "@/config/connectDB";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

interface SingleRoomParams {
  params: {
    roomId: string;
  };
}

connectDB();

export async function GET(
  req: NextRequest,
  { params: { roomId } }: SingleRoomParams
) {
  try {
    const room = await Room.findById(roomId).populate("reviews.user");
    if (!room) {
      throw new Error("can't find room");
    }
    return NextResponse.json(
      { message: "get room successfully", room },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { roomId } }: SingleRoomParams
) {
  try {
    await Room.findByIdAndDelete(roomId);

    return NextResponse.json(
      { message: "room deleted successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params: { roomId } }: SingleRoomParams
) {
  try {
    const reqBody = await req.json();
    const room = await Room.findByIdAndUpdate(roomId, reqBody, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      { message: "room updated successfully", room },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
