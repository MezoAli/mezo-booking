import PaddingContainer from "@/components/PaddingContainer";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(OPTIONS);
  if (session?.user.role === "user") {
    redirect("/");
  }
  return (
    <PaddingContainer>
      <div className="grid grid-cols-12 gap-2 mt-3">
        <div className="col-span-12 md:col-span-3 sticky md:relative bottom-0 top-[65px] left-0 z-40">
          <AdminSidebar />
        </div>
        <div className="col-span-12 md:col-span-9">{children}</div>
      </div>
    </PaddingContainer>
  );
}

export default AdminLayout;
