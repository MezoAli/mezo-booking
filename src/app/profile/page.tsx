import axios from "axios";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import RegisterForm from "@/components/RegisterForm";
import { setHeadersToken } from "@/lib/setHeadersToken";

export const dynamic = "force-dynamic";

const getUserData = async (id: string) => {
  const headers = setHeadersToken();
  const response = await axios.get(
    `${process.env.SITE_URL}/api/profile?id=${id}`,
    headers
  );

  return response.data;
};

const ProfilePage = async () => {
  const session: any = await getServerSession(OPTIONS);
  const data = await getUserData(session?.user?._id as string);

  return <RegisterForm user={data?.user} />;
};

export default ProfilePage;
