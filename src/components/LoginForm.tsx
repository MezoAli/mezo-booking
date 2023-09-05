import Image from "next/image";
import PaddingContainer from "./PaddingContainer";
import Link from "next/link";
export default function LoginForm(): JSX.Element {
  return (
    <PaddingContainer>
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <Image
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
              width={600}
              height={600}
            />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
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
                  ></input>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="rounded-md p-3 border w-[70%] border-gray-300 focus:border-gray-600"
                    id="password"
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
                  type="button"
                  className="bg-blue-400 rounded-md px-4 py-2 transition duration-150 ease-in-out hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"
                >
                  Login
                </button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?{" "}
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
      </div>
    </PaddingContainer>
  );
}
