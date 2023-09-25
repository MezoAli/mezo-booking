import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function getUserData() {
  const token = await getServerSession(OPTIONS);
  return token;
}

export default getUserData;
