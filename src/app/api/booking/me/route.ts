import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    const userBookings = await Booking.find({ user: userId });

    return NextResponse.json(
      { message: "get data successfully", userBookings },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
