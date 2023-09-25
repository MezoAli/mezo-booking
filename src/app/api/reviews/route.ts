import Room, { IReview, RoomDocument } from "@/models/roomModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { OPTIONS } from "../auth/[...nextauth]/route";
import connectDB from "@/config/connectDB";

connectDB();

export async function PATCH(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const session = await getServerSession(OPTIONS);

    if (!session) {
      throw new Error("Login First to Add A Review");
    }

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
      room.reviews.reduce(
        (acc: number, review: any) => review.rating + acc,
        0
      ) / room.reviews.length;

    await room.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Review Added Successfully", room },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
