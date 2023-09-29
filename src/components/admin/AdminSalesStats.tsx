interface Props {
  totalSales: number;
  numberOfBookings: number;
  usersCount: number;
  startDate: Date;
  endDate: Date;
  loading: boolean;
}
import { BsCurrencyDollar } from "react-icons/bs";
import { HiDocument } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
const AdminSalesStats = ({
  numberOfBookings,
  totalSales,
  usersCount,
  startDate,
  endDate,
  loading,
}: Props) => {
  return (
    <div className="my-[40px]">
      <p className="text-center text-gray-600 my-4 text-xl italic">
        {startDate.toLocaleDateString() &&
        endDate.toLocaleDateString() === new Date().toLocaleDateString() ? (
          "Data For Today"
        ) : (
          <div>
            {loading ? (
              "Fetching..."
            ) : (
              <span>
                {" "}
                Data for the period from {startDate.toLocaleDateString()} to{" "}
                {endDate.toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </p>
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-3 items-center ">
        <div className="flex min-w-[220px] justify-between items-center px-[40px] gap-3 py-2 shadow-lg">
          <div className="text-3xl text-gray-500">
            <BsCurrencyDollar />
          </div>
          <div className="flex justify-center flex-col items-center gap-2">
            <p className="text-xl">Sales</p>
            <b>{loading ? "Fetching..." : totalSales}</b>
          </div>
        </div>
        <div className="flex min-w-[220px] justify-between items-center px-[40px] gap-3 py-2 shadow-lg">
          <div className="text-3xl text-gray-500">
            <HiDocument />
          </div>
          <div className="flex justify-center flex-col items-center gap-2">
            <p className="text-xl">Bookings</p>
            <b>{loading ? "Fetching..." : numberOfBookings}</b>
          </div>
        </div>
        <div className="flex min-w-[220px] justify-between items-center px-[40px] gap-3 py-2 shadow-lg">
          <div className="text-3xl text-gray-500">
            <AiOutlineUser />
          </div>
          <div className="flex justify-center flex-col items-center gap-2">
            <p className="text-xl">Total Users</p>
            <b>{usersCount}</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesStats;
