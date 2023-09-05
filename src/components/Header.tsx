import Image from "next/image";
import Link from "next/link";
import PaddingContainer from "./PaddingContainer";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
// import { signOut } from "next-auth/react";

const Header = async () => {
  const session = await getServerSession(OPTIONS);
  return (
    <div className="border-b mb-4 sticky top-0 left-0 bg-white/30 backdrop-blur-sm">
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
            <h2>hello {session?.user?.name}</h2>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </nav>
      </PaddingContainer>
    </div>
  );
};

export default Header;
