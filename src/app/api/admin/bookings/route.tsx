import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { OPTIONS } from "../../auth/[...nextauth]/route";
import Booking from "@/models/bookingModel";
import connectDB from "@/config/connectDB";
connectDB();
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Show This Route");
    }

    const bookings = await Booking.find().populate("user");

    return NextResponse.json(
      { message: "get bookings successfully", bookings },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Show This Route");
    }
    const bookingId = req.nextUrl.searchParams.get("bookingId");

    await Booking.findByIdAndDelete(bookingId);

    return NextResponse.json(
      { message: "Booking Deleted Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
