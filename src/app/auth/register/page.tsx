import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import RegisterForm from "@/components/RegisterForm";
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession(OPTIONS);
  if (session) {
    return redirect("/");
  }

  return <RegisterForm />;
};

export default RegisterPage;
