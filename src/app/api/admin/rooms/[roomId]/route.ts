import connectDB from "@/config/connectDB";
import Room, { RoomDocument } from "@/models/roomModel";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const room = await Room.findById(params.roomId).populate("reviews.user");

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const reqBody = await req.json();
    const path = req.nextUrl.searchParams.get("path");
    if (!path) {
      return NextResponse.json(
        { message: "no path provided" },
        { status: 500 }
      );
    }

    const room = await Room.findByIdAndUpdate(params.roomId, reqBody, {
      new: true,
    });

    revalidatePath(path);

    return NextResponse.json(
      { message: "Room Data Updated Successfully", room },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
