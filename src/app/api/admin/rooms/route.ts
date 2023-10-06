import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { OPTIONS } from "../../auth/[...nextauth]/route";
import Room, { RoomDocument } from "@/models/roomModel";
import { revalidatePath } from "next/cache";
import { deleteImage } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Show This Route");
    }

    const rooms = await Room.find();

    return NextResponse.json(
      { message: "get rooms successfully", rooms },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Delete Room");
    }
    const roomId = req.nextUrl.searchParams.get("roomId");

    const room: RoomDocument | null = await Room.findById(roomId);

    if (!room) {
      throw new Error("No Room Found");
    }

    if (room?.images) {
      room.images.map(async (img) => await deleteImage(img.public_id));
    }

    await Room.findByIdAndDelete(roomId);

    revalidatePath("/admin/rooms");

    return NextResponse.json(
      { message: "Room Deleted Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Create New Room");
    }
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
