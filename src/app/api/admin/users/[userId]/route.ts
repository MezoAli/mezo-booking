import connectDB from "@/config/connectDB";
import User from "@/models/userModel";
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
