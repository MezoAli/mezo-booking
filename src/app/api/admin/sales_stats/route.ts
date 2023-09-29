import Booking from "@/models/bookingModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { extendMoment } from "moment-range";
import Moment from "moment";
import connectDB from "@/config/connectDB";
connectDB();

const moment = extendMoment(Moment);

const getLast6MonthsSales = async () => {
  const last6MonthsSales: any = [];

  const currentDate = moment();

  const fetchMonthSales = async (
    startOfMonth: moment.Moment,
    endOfMonth: moment.Moment
  ) => {
    const result = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$amountPaid" },
          numberOfBookings: { $sum: 1 },
        },
      },
    ]);

    const { totalSales, numberOfBookings } =
      result.length > 0 ? result[0] : { totalSales: 0, numberOfBookings: 0 };

    last6MonthsSales.push({
      totalSales,
      numberOfBookings,
      monthName: moment(startOfMonth).format("MMMM"),
    });
  };

  for (let i = 0; i < 6; i++) {
    const startOfMonth = moment(currentDate).startOf("month");
    const endOfMonth = moment(currentDate).endOf("month");

    await fetchMonthSales(startOfMonth, endOfMonth);

    currentDate.subtract(1, "months");
  }
  return last6MonthsSales;
};

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

    return NextResponse.json(
      {
        message: "get booking successfully",
        bookingsNumber,
        totalSales,
        usersCount,
        lastMonthSales,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
