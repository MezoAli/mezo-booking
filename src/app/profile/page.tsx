import axios from "axios";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const getUserData = async (id: string) => {
  const response = await axios.get(
    `${process.env.SITE_URL}/api/profile?id=${id}`
  );
  return response.data;
};

const ProfilePage = async () => {
  const session: any = await getServerSession(OPTIONS);
  const user = await getUserData(session?.user?._id as string);
  console.log(user);

  return <div>ProfilePage</div>;
};

export default ProfilePage;
