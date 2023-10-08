import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/config/connectDB";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await User.findById(params.userId);

    if (!user) {
      throw new Error("No booking Found");
    }

    return NextResponse.json(
      { message: "get user successfully", user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admins Are Allowed To Update User");
    }
    const reqBody = await req.json();
    const path = req.nextUrl.searchParams.get("path");

    const user = await User.findByIdAndUpdate(params.userId, reqBody, {
      new: true,
    });

    revalidatePath(path as string);

    return NextResponse.json(
      { message: "user updated successfully", user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
