import Booking from "@/models/bookingModel";
import moment from "moment";

export const topPerformaingRooms = async () => {
  const currentDate = moment();
  const startOfMonth = moment(currentDate).startOf("month");
  const endOfMonth = moment(currentDate).endOf("month");
  const topRooms = await Booking.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() },
      },
    },
    {
      $group: {
        _id: "$room",
        totalBookings: { $sum: 1 },
      },
    },
    {
      $sort: {
        totalBookings: -1,
      },
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: "rooms",
        localField: "_id",
        foreignField: "_id",
        as: "roomData",
      },
    },
    {
      $unwind: "$roomData",
    },
    {
      $project: {
        _id: 0,
        roomName: "$roomData.name",
        totalBookings: 1,
      },
    },
  ]);

  return topRooms;
};
