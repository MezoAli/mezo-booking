import AdminBookingsTable from "@/components/admin/AdminBookingsTable";
import { setHeadersToken } from "@/lib/setHeadersToken";
import axios from "axios";

const getAdminBookings = async () => {
  try {
    const headers = setHeadersToken();
    const response = await axios.get(
      `${process.env.SITE_URL}/api/admin/bookings`,
      {
        headers: headers.headers,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

const AdminBookingsPage = async () => {
  const response = await getAdminBookings();

  return <AdminBookingsTable bookings={response.bookings} />;
};

export default AdminBookingsPage;
