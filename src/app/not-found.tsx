import PaddingContainer from "@/components/PaddingContainer";
import Link from "next/link";

const NotFound = () => {
  return (
    <PaddingContainer>
      <div className="flex justify-center gap-4 flex-col items-center h-[70vh]">
        <h2 className="text-3xl font-bold">404</h2>
        <div className="flex justify-center gap-3 items-center">
          <p className="font-semibold text-red-500">Opps !</p>
          <span>Page Not Found</span>
        </div>
        <span>The Page You Are Looking For Is Not Exist</span>
        <button className="px-4 py-2 text-white bg-blue-400 hover:bg-blue-700 transition duration-150 ease-in-out rounded-md">
          <Link href="/">Go Home</Link>
        </button>
      </div>
    </PaddingContainer>
  );
};

export default NotFound;
