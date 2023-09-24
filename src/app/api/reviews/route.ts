import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { roomId, userId, comment, rating } = reqBody;
    const review = {
      user: userId,
      comment,
      rating: Number(rating),
    };
    const room = await Room.findByIdAndUpdate(roomId, review, {
      new: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
