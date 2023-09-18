import { NextRequest, NextResponse } from "next/server";
import Booking from "../../../../models/bookingModel";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const roomId = searchParams.get("roomId");

    const checkInDate = new Date(searchParams.get("checkInDate") as string);

    const checkOutDate = new Date(searchParams.get("checkOutDate") as string);

    const bookings = await Booking.find({
      room: roomId,
      $and: [
        { checkInDate: { $lte: checkOutDate } },
        { checkOutDate: { $gte: checkInDate } },
      ],
    });

    const isAvailable = bookings.length === 0;

    return NextResponse.json({ isAvailable });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
