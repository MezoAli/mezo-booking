import getUserData from "@/lib/getUserData";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const roomId = req.nextUrl.searchParams.get("roomId");
    const token = await getUserData();
    const bookings = await Booking.find({
      room: roomId,
      user: token?.user?._id,
    });

    const canReview = bookings.length > 0 ? true : false;
    return NextResponse.json({ canReview });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
