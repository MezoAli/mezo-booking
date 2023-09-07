import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const user = await User.findByIdAndUpdate(reqBody?._id, reqBody, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      { message: "Profile Updated Successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const user = await User.findById(reqBody._id).select("-password");

    return NextResponse.json(
      { message: "Get User Data Successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
