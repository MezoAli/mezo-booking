import { NextRequest, NextResponse } from "next/server";
import Booking from "../../../../models/bookingModel";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const roomId = searchParams.get("roomId");

    const bookings = await Booking.find({
      room: roomId,
    });

    const bookedDates = bookings.flatMap((booking) => {
      return Array.from(
        moment
          .range(moment(booking.checkInDate), moment(booking.checkOutDate))
          .by("day")
      );
    });

    return NextResponse.json({ bookedDates });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
