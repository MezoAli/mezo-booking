import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { OPTIONS } from "../../auth/[...nextauth]/route";
import User from "@/models/userModel";
import connectDB from "@/config/connectDB";
connectDB();
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Show This Route");
    }

    const users = await User.find();
    return NextResponse.json(
      { message: "get users successfully", users },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Show This Route");
    }
    const userId = req.nextUrl.searchParams.get("userId");

    await User.findByIdAndDelete(userId);

    return NextResponse.json(
      { message: "User Deleted Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
