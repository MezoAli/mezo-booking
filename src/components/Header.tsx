"use client";
import Image from "next/image";
import Link from "next/link";
import PaddingContainer from "./PaddingContainer";
import { useSession } from "next-auth/react";
import UserSettings from "./UserSettings";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="border-b mb-4 z-50 sticky top-0 left-0 bg-white/30 backdrop-blur-sm">
      <PaddingContainer>
        <nav className="flex justify-between items-center py-4 ">
          <Link href="/">
            <Image
              src="/images/bookit_logo.png"
              alt="BookIT"
              width={120}
              height={120}
            />
          </Link>

          {session?.user ? (
            <UserSettings />
          ) : (
            <Link
              href="/auth/login"
              className="bg-[#EC194E] text-white font-semibold px-4 py-2 rounded-md hover:text-[#EC194E] hover:bg-white hover:border-[#EC194E] hover:border hover:outline-none box-border transition duration-150"
            >
              Login
            </Link>
          )}
        </nav>
      </PaddingContainer>
    </div>
  );
};

export default Header;
