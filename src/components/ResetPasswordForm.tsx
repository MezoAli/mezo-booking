"use client";
import axios from "axios";
import PaddingContainer from "./PaddingContainer";
import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ resetToken }: { resetToken: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post(
        `/api/password/reset?resetToken=${resetToken}`,
        {
          password,
          confirmPassword,
        }
      );
      console.log(response);

      toast.success(response.data.message);
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PaddingContainer>
      <h2 className="text-center text-2xl my-4 font-semibold">
        Enter New Password
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center w-full flex-col gap-2 border p-4 shadow-md my-4"
      >
        <label htmlFor="email" className="text-lg my-5 font-semibold">
          Password
        </label>
        <input
          type="password"
          className="rounded-md w-full md:w-[50%] p-3 border border-gray-300 focus:border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label htmlFor="email" className="text-lg my-5 font-semibold">
          Confirm Password
        </label>
        <input
          type="password"
          className="rounded-md w-full md:w-[50%] p-3 border border-gray-300 focus:border-gray-600"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#EC194E] text-white w-full md:w-[50%] hover:border my-4 font-semibold px-4 py-2 rounded-md hover:text-[#EC194E] hover:bg-white hover:border-[#EC194E]  hover:outline-none box-border transition duration-150"
        >
          {loading ? "Loading..." : "Save Password"}
        </button>
      </form>
    </PaddingContainer>
  );
};

export default ResetPasswordForm;
