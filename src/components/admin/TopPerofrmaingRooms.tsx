"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface RoomData {
  totalBookings: number;
  roomName: string;
}

interface Props {
  topRooms: RoomData[];
}

function TopPerformaingRooms({ topRooms }: Props) {
  const data = {
    labels: topRooms.map((item) => item.roomName),
    datasets: [
      {
        label: "# of Bookings",
        data: topRooms.map((item) => item.totalBookings),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="flex items-center justify-center w-full flex-col gap-4">
      <h3 className="text-xl font-semibold">Top Performaing Rooms</h3>
      <Doughnut data={data} />
    </div>
  );
}

export default TopPerformaingRooms;
