import connectDB from "@/config/connectDB";
import Booking from "@/models/bookingModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      throw new Error("Not Authorized, Login First To Create Booking");
    }
    const reqBody = await req.json();

    const booking = await Booking.create(reqBody);

    return NextResponse.json(
      { message: "Booking Created Successfully", booking },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get("bookingId");

    const booking = await Booking.findById(id).populate("user room");

    return NextResponse.json(
      { message: "Get Booking Successfully", booking },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
