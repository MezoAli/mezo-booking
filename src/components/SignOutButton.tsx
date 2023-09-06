"use client";
import { useAppSelector } from "@/redux/store/hooks";
import { signOut, useSession } from "next-auth/react";
const SignOutButton = () => {
  // const user = useAppSelector((state) => state.user);
  // console.log("user from redux : ", user);
  const { data: session } = useSession();
  console.log(session?.user);

  return (
    <button
      className="rounded-md px-4 py-2 bg-red-400 text-white"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
