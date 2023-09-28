import AdminDashboard from "@/components/admin/AdminDashboard";
import SalesHistory from "@/components/admin/SalesHistory";
import TopPerformaingRooms from "@/components/admin/TopPerofrmaingRooms";

const AdminDashboardPage = async () => {
  return (
    <div className="">
      <AdminDashboard />
      <div className="grid grid-cols-1 lg:grid-cols-2 my-4 py-2 gap-3 border-t">
        <SalesHistory />
        <TopPerformaingRooms />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
