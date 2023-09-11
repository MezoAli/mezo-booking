import sendEmail from "@/lib/sendEmail";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const user = await User.findOne({ email: reqBody.email });

    if (!user) {
      throw new Error("user not exist");
    }

    const resetToken = user.setResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetToeknUrl = `${process.env.SITE_URL}/password/reset/${resetToken}`;

    try {
      await sendEmail({
        from: "Mezo-Booking",
        to: user.email,
        subject: "Reset Password (Mezo-Booking)",
        text: `Your Password Reset Url Is As Follows \n\n
        ${resetToeknUrl} \n\n
        If You Don't Request That Just Ignore The Message\n\n
        Thank You For Using Mezo-Booking
        `,
        html: `Your Password Reset Url Is As Follows \n\n
        ${resetToeknUrl} \n\n
        If You Don't Request That Just Ignore The Message \n\n
        Thank You For Using Mezo-Booking
        `,
      });
    } catch (error: any) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error(error.message);
    }

    return NextResponse.json(
      { messgae: `Email Sent Successfully to ${user.email}` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
