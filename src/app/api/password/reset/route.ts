import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import connectDB from "@/config/connectDB";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const resetToken = req.nextUrl.searchParams.get("resetToken");
    const reqBody = await req.json();
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken as string)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw new Error("User not found or Reset token has expired");
    }

    if (reqBody.password !== reqBody.confirmPassword) {
      throw new Error("Password dosn't match Conform Password");
    }

    const hashedPassword = await bcrypt.hash(reqBody.password, 12);

    user.password = hashedPassword;

    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return NextResponse.json(
      { message: "Password Updated Successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
