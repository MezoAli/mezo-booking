import moment from "moment";
import Booking from "@/models/bookingModel";

export const getLast6MonthsSales = async () => {
  const last6MonthsSales: any = [];

  const currentDate = moment();

  const fetchMonthSales = async () => {
    const startOfMonth = moment(currentDate).startOf("month");
    const endOfMonth = moment(currentDate).endOf("month");
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
    await fetchMonthSales();

    currentDate.subtract(1, "months");
  }
  return last6MonthsSales;
};
