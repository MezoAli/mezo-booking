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
