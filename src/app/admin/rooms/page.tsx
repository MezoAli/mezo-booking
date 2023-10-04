import RoomsTable from "@/components/admin/RoomsTable";
import { setHeadersToken } from "@/lib/setHeadersToken";
import axios from "axios";

const getAdminRooms = async () => {
  try {
    const headers = setHeadersToken();
    const response = await axios.get(
      `${process.env.SITE_URL}/api/admin/rooms`,
      {
        headers: headers.headers,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

const AdminRoomsPage = async () => {
  const response = await getAdminRooms();

  return <RoomsTable rooms={response?.rooms} />;
};

export default AdminRoomsPage;
