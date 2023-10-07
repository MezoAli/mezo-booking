import AdminUsersTable from "@/components/admin/AdminUsersTable";
import { setHeadersToken } from "@/lib/setHeadersToken";
import axios from "axios";

const getUsers = async () => {
  try {
    const headers = setHeadersToken();
    const response = await axios.get(
      `${process.env.SITE_URL}/api/admin/users`,
      {
        headers: headers.headers,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

const AdminUsersPage = async () => {
  const data = await getUsers();
  console.log(data);

  return <AdminUsersTable users={data?.users} />;
};

export default AdminUsersPage;
