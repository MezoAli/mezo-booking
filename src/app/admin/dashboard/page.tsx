import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminSalesStats from "@/components/admin/AdminSalesStats";
import SalesHistory from "@/components/admin/SalesHistory";
import TopPerformaingRooms from "@/components/admin/TopPerofrmaingRooms";

const Admin = async () => {
  return (
    <div className="">
      <AdminDashboard />
      <AdminSalesStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 my-4 py-2 gap-3 border-t">
        <SalesHistory />
        <TopPerformaingRooms />
      </div>
    </div>
  );
};

export default Admin;
