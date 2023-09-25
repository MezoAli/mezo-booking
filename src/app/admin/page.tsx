import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Admin = async () => {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role === "user") {
    redirect("/");
  }
  return <div>Admin</div>;
};

export default Admin;
