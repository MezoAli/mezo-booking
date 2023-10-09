import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import Room, { IReview, RoomDocument } from "@/models/roomModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { roomId: string } }
) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Delete Reviews");
    }
    const room: RoomDocument | null = await Room.findById(params.roomId);
    if (!room) {
      throw new Error("No Room Found");
    }
    const reviewId = req.nextUrl.searchParams.get("reviewId");

    const roomReviews = room?.reviews.filter(
      (review: IReview) => review._id.toString() !== reviewId
    ) as IReview[];

    const numOfReviews = roomReviews.length;

    const ratings =
      numOfReviews === 0
        ? 0
        : room?.reviews.reduce(
            (acc: number, item: { rating: number }) => item.rating + acc,
            0
          ) / numOfReviews;

    await Room.findByIdAndUpdate(params.roomId, {
      reviews: roomReviews,
      numOfReviews,
      ratings,
    });

    return NextResponse.json({ message: "Review Deleted Successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
