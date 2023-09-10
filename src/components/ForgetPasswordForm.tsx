"use client";
import PaddingContainer from "./PaddingContainer";
import { useState } from "react";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <PaddingContainer>
      <h2 className="text-center text-2xl my-4 font-semibold">
        Forget Password
      </h2>
      <form className="flex justify-center items-center w-full flex-col gap-4">
        <label htmlFor="email" className="text-lg my-5 font-semibold">
          Email
        </label>
        <input
          type="email"
          className="rounded-md w-full md:w-[50%] p-3 border border-gray-300 focus:border-gray-600"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#EC194E] text-white w-full md:w-[50%] hover:border my-4 font-semibold px-4 py-2 rounded-md hover:text-[#EC194E] hover:bg-white hover:border-[#EC194E]  hover:outline-none box-border transition duration-150"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </PaddingContainer>
  );
};

export default ForgetPasswordForm;
