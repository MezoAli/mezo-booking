import { uploadImage } from "@/lib/cloudinary";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

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

    const urls = (await Promise.all(reqBody?.images)).map(uploader);

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
