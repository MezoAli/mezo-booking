"use client";
import Link from "next/link";
import PaddingContainer from "./PaddingContainer";
import Image from "next/image";
import { FormEvent, useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, password, avatar);
  };
  return (
    <PaddingContainer>
      <div className="h-full">
        <div className="mb-12 w-full md:w-[50%] md:mx-auto">
          <form onSubmit={handleRegister}>
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <h3 className="text-center w-full text-2xl font-semibold mb-5">
                Join Us
              </h3>
            </div>

            {/* <!-- Separator between social media sign in and email/password sign in -->
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                Or
              </p>
            </div> */}

            <div className="flex flex-col gap-4 w-full my-4">
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="rounded-md p-3 border border-gray-300 focus:border-gray-600 w-[70%]"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  className="rounded-md p-3 border border-gray-300 focus:border-gray-600 w-[70%]"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="flex justify-between items-center gap-4">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="rounded-md p-3 border w-[70%] border-gray-300 focus:border-gray-600"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col items-center justify-center gap-1">
                  <p className="text-md">Avatar</p>
                  <div className="w-[50px] h-[50px] rounded-full bg-gray-400 relative overflow-hidden">
                    {previewAvatar && (
                      <Image src={previewAvatar} alt="avatar" fill />
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    placeholder="choose avatar"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <button
                type="submit"
                className="bg-blue-400 rounded-md px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"
              >
                Register
              </button>

              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Have an account?
                <Link
                  href="/auth/login"
                  className="text-blue-400 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700 underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </PaddingContainer>
  );
};

export default RegisterForm;
