"use client";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
const AdminDashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
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
      <button className="px-4 py-2 rounded-md bg-brand text-white hover:bg-red-900 transition duration-150 ease-in-out">
        Fetch
      </button>
    </div>
  );
};

export default AdminDashboard;
