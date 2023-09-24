import Room, { IReview, RoomDocument } from "@/models/roomModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { OPTIONS } from "../auth/[...nextauth]/route";

export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const session = await getServerSession(OPTIONS);

    const { roomId, comment, rating } = reqBody;

    const room = await Room.findById(roomId);
    const review: any = {
      user: session?.user?._id,
      comment,
      rating: Number(rating),
    };

    room?.reviews.push(review);

    room.numOfReviews = room.reviews.length;

    room.ratings =
      room.reviews.reduce((acc: number, review: any) => {
        return review.rating + acc, 0;
      }) / room.reviews.length;

    room.save();

    return NextResponse.json(
      { message: "Review Added Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
