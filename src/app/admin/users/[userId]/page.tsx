import UpdateUserForm from "@/components/admin/UpdateUserForm";
import axios from "axios";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: {
    userId: string;
  };
}

const getUserData = async (userId: string) => {
  const response = await axios.get(
    `${process.env.SITE_URL}/api/admin/users/${userId}`
  );
  return response?.data;
};

const UserPage = async ({ params }: UserPageProps) => {
  const userData = await getUserData(params?.userId);
  console.log(userData);

  if (!userData?.user) {
    notFound();
  }

  return <UpdateUserForm user={userData?.user} />;
};

export default UserPage;
