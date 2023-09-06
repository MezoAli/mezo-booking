"use client";
import Image from "next/image";
import Link from "next/link";
import PaddingContainer from "./PaddingContainer";
import { useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";

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
            <SignOutButton />
          ) : (
            <Link href="/auth/login">Login</Link>
          )}
        </nav>
      </PaddingContainer>
    </div>
  );
};

export default Header;
