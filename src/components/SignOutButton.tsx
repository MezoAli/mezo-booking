"use client";
import { signOut } from "next-auth/react";
const SignOutButton = () => {
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
