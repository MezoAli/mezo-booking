"use client";
import PaddingContainer from "./PaddingContainer";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);
      console.log(result);

      if (result?.error) {
        toast.error("incorrect email or password");
        return;
      }
      toast.success("Login In Successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <PaddingContainer>
      <div className="h-full">
        <div className="mb-12 w-full md:w-[50%] md:mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="mb-0 mr-4 text-lg">Sign in with</p>
            </div>

            {/* <!-- Separator between social media sign in and email/password sign in --> */}
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                Or
              </p>
            </div>

            <div className="flex flex-col gap-4 w-full my-4">
              <div className="flex justify-between items-center gap-4">
                <label htmlFor="email">Email</label>
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
            </div>

            <div className="flex justify-start items-start my-5">
              <Link href="#!" className="underline underline-offset-2">
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-400 rounded-md px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"
              >
                {loading ? "Loading..." : "Login"}
              </button>

              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Do Not have an account?
                <Link
                  href="/auth/register"
                  className="text-blue-400 transition duration-150 ease-in-out hover:text-blue-600 focus:text-blue-600 active:text-blue-700 underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </PaddingContainer>
  );
}
