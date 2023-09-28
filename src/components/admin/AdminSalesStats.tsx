interface Props {
  totalSales: number;
  numberOfBookings: number;
  usersCount: number;
}
import { BsCurrencyDollar } from "react-icons/bs";
import { HiDocument } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
const AdminSalesStats = ({
  numberOfBookings,
  totalSales,
  usersCount,
}: Props) => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-between gap-3 items-center my-5">
      <div className="flex min-w-[220px] justify-between items-center px-[40px] gap-3 py-2 shadow-lg">
        <div className="text-3xl text-gray-500">
          <BsCurrencyDollar />
        </div>
        <div className="flex justify-center flex-col items-center gap-2">
          <p className="text-xl">Sales</p>
          <b>{totalSales}</b>
        </div>
      </div>
      <div className="flex min-w-[220px] justify-between items-center px-[40px] gap-3 py-2 shadow-lg">
        <div className="text-3xl text-gray-500">
          <HiDocument />
        </div>
        <div className="flex justify-center flex-col items-center gap-2">
          <p className="text-xl">Bookings</p>
          <b>{numberOfBookings}</b>
        </div>
      </div>
      <div className="flex min-w-[220px] justify-between items-center px-[40px] gap-3 py-2 shadow-lg">
        <div className="text-3xl text-gray-500">
          <AiOutlineUser />
        </div>
        <div className="flex justify-center flex-col items-center gap-2">
          <p className="text-xl">Users</p>
          <b>{usersCount}</b>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesStats;
