import LoginForm from "@/components/LoginForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

const LoginPage = async () => {
  const session = await getServerSession(OPTIONS);
  if (session) {
    return redirect("/");
  }
  return <LoginForm />;
};

export default LoginPage;
