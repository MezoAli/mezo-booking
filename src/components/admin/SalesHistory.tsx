"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Last 6 Months Sales And Bookings",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

interface SalesData {
  totalSales: number;
  numberOfBookings: number;
  monthName: string;
}

interface Props {
  last6MonthsSales: SalesData[];
}

function SalesHistory({ last6MonthsSales }: Props) {
  const data = {
    labels: last6MonthsSales.map((item) => item.monthName).reverse(),
    datasets: [
      {
        label: "Sales",
        data: last6MonthsSales.map((item) => item.totalSales).reverse(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Bookings",
        data: last6MonthsSales.map((item) => item.numberOfBookings).reverse(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className="flex items-center justify-center w-full flex-col gap-4">
      <h3 className="text-xl font-semibold">Sales History</h3>
      <Line options={options} data={data} />
    </div>
  );
}

export default SalesHistory;
