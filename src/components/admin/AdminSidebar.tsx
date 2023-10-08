"use client";
import { RxDashboard } from "react-icons/rx";
import { BsFillBuildingFill } from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
const AdminSidebar = () => {
  const pathname = usePathname();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <RxDashboard />,
    },
    {
      name: "Rooms",
      path: "/admin/rooms",
      icon: <BsFillBuildingFill />,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <TbBrandBooking />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <AiOutlineUser />,
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: <MdOutlineRateReview />,
    },
  ];
  return (
    <aside className="w-full h-auto md:h-[60vh]" aria-label="Sidebar">
      <ul className="font-medium py-5 flex md:flex-col gap-2 md:gap-4 flex-wrap md:flex-nowrap justify-center items-center px-2 bg-white/30 backdrop-blur-sm">
        {menuItems.map((item) => {
          const active = pathname === item.path || pathname.includes(item.path);
          return (
            <li
              key={item.name}
              className={`w-auto md:w-full rounded-md font-medium ${
                active ? "text-brand" : ""
              } hover:bg-gray-50 hover:text-brand p-2 md:px-4 transition duration-100 ease-in-out`}
            >
              <Link
                className="flex justify-start md:justify-between w-full items-center gap-1 md:gap-2"
                href={item.path}
              >
                <span className="text-sm md:text-xl">{item.icon}</span>
                <h2 className="font-semibold">{item.name}</h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
