import connectDB from "@/config/connectDB";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import Room, { RoomDocument } from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function PATCH(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const room = await Room.findById(params.roomId);
    if (!room) {
      throw new Error("No Room Found");
    }
    const reqBody = await req.json();

    const uploader = async (image: string) =>
      uploadImage(image, "mezo-booking/rooms");

    const urls = await Promise.all(reqBody.map(uploader));

    room?.images.push(...urls);

    await room.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Images Uploaded Successfully", room },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const room: RoomDocument | null = await Room.findById(params.roomId);
    if (!room) {
      throw new Error("No Room Found");
    }
    const public_id = req.nextUrl.searchParams.get("public_id");

    const isDeleted = await deleteImage(public_id as string);

    if (isDeleted) {
      room.images = room?.images?.filter((img) => img.public_id !== public_id);
    } else {
      throw new Error("Image already Deleted");
    }

    await room.save();

    return NextResponse.json({
      message: "Image Deleted Sccessfully",
      isDeleted,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
