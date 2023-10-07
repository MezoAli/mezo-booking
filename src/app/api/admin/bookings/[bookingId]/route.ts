import connectDB from "@/config/connectDB";
import Booking from "@/models/bookingModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET(
  req: NextRequest,
  { params }: { params: { bookingId: string } }
) {
  try {
    const booking = await Booking.findById(params.bookingId).populate(
      "user room"
    );

    if (!booking) {
      throw new Error("No booking Found");
    }

    return NextResponse.json(
      { message: "get booking successfully", booking },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
