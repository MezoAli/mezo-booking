import Booking from "@/models/bookingModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/config/connectDB";
import { getLast6MonthsSales } from "@/lib/getLast6MonthsSales";
import { topPerformaingRooms } from "@/lib/topPerformaingRooms";
connectDB();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const startDate = new Date(searchParams.get("startDate") as string);
    const endDate = new Date(searchParams.get("endDate") as string);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const bookings = await Booking.find({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const bookingsNumber = bookings.length;

    const totalSales = bookings.reduce(
      (acc: number, booking: any) => booking.amountPaid + acc,
      0
    );

    const usersCount = await User.countDocuments();

    const lastMonthSales = await getLast6MonthsSales();

    const topRooms = await topPerformaingRooms();

    return NextResponse.json(
      {
        message: "get booking successfully",
        bookingsNumber,
        totalSales,
        usersCount,
        lastMonthSales,
        topRooms,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
