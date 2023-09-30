"use client";
import DatePicker from "react-datepicker";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
import AdminSalesStats from "./AdminSalesStats";
import SalesHistory from "./SalesHistory";
import TopPerformaingRooms from "./TopPerofrmaingRooms";
const AdminDashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [numberOfBookings, setNumberOfBookings] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [last6MonthsSales, setLast6MonthsSales] = useState([]);
  const [topRooms, setTopRooms] = useState([]);
  const [usersCount, setUsersCount] = useState(0);

  const handleSubmit = async () => {
    if (startDate && endDate) {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/sales_stats", {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        });
        setNumberOfBookings(response.data.bookingsNumber);
        setTotalSales(response.data.totalSales);
        setUsersCount(response.data.usersCount);
        setLast6MonthsSales(response.data.lastMonthSales);
        setTopRooms(response.data.topRooms);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please Select Dates");
    }
  };

  useEffect(() => {
    const getTodayData = async () => {
      const response = await axios.get("/api/admin/sales_stats", {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      console.log("response from useEffect", response);

      setNumberOfBookings(response.data.bookingsNumber);
      setTotalSales(response.data.totalSales);
      setUsersCount(response.data.usersCount);
      setLast6MonthsSales(response.data.lastMonthSales);
      setTopRooms(response.data.topRooms);
    };

    getTodayData();
  }, []);
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap justify-start items-center gap-5 my-2 border-b py-3">
        <div className="flex justify-start items-start flex-col  gap-3">
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border px-3 py-2 focus:outline-none rounded-md"
          />
        </div>
        <div className="flex justify-start items-start flex-col  gap-3">
          <label>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border px-3 py-2 focus:outline-none rounded-md"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 rounded-md bg-brand text-white hover:bg-red-900 transition duration-150 ease-in-out"
        >
          {loading ? "Fetching..." : "Fetch"}
        </button>
      </div>
      <AdminSalesStats
        numberOfBookings={numberOfBookings}
        totalSales={totalSales}
        usersCount={usersCount}
        startDate={startDate}
        endDate={endDate}
        loading={loading}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 my-4 py-2 gap-3 border-t">
        {last6MonthsSales.length > 0 && (
          <SalesHistory last6MonthsSales={last6MonthsSales} />
        )}
        {topRooms.length > 0 && <TopPerformaingRooms topRooms={topRooms} />}
      </div>
    </>
  );
};

export default AdminDashboard;
