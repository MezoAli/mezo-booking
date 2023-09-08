"use client";
import Link from "next/link";
import PaddingContainer from "./PaddingContainer";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/types/userType";

interface RegisterFormProps {
  user: User | undefined;
}

const RegisterForm = ({ user }: RegisterFormProps) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar?.url);

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e?.target?.files[0];
      const fr = new FileReader();
      fr.readAsDataURL(file);

      fr.onloadend = () => {
        if (fr.result) {
          const result = fr.result;
          setAvatar(result as string);
          setPreviewAvatar(result as string);
        }
      };
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    if (user) {
      try {
        const reqBody = {
          name,
          password,
          email,
          avatar,
          _id: user._id,
        };
        const response = await axios.patch("/api/profile", reqBody);
        toast.success(response.data.message);
        router.push("/");
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const reqBody = {
          name,
          password,
          email,
          avatar,
        };

        const response = await axios.post("/api/auth/register", reqBody);
        toast.success(response.data.message);
        router.push("/auth/login");
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <PaddingContainer>
      <div className="h-full">
        <div className="mb-12 w-full md:w-[50%] md:mx-auto">
          <form onSubmit={handleRegister}>
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <h3 className="text-center w-full text-2xl font-semibold mb-5">
                {user ? "Update Profile" : "Join Us"}
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
                  value={name ? name : ""}
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
                    onChange={(e) => handleAvatar(e)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-400 rounded-md px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"
              >
                {loading ? "Loading..." : user ? "Update" : "Register"}
              </button>

              {user ? (
                ""
              ) : (
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Have an account?
                  <Link
                    href="/auth/login"
                    className="text-blue-400 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700 underline"
                  >
                    Login
                  </Link>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </PaddingContainer>
  );
};

export default RegisterForm;
