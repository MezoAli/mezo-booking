import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/config/connectDB";
import { getToken } from "next-auth/jwt";

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(req: NextRequest) {
  try {
    let reqBody = await req.json();

    if (reqBody.password) {
      if (reqBody.password.length < 6) {
        throw new Error("password should be atleast 6 characters");
      }
      const hashPassword = await bcrypt.hash(reqBody.password, 12);
      reqBody.password = hashPassword;
    }

    if (!reqBody?.password) {
      delete reqBody.password;
    }

    if (reqBody.avatar) {
      const result = await cloudinary.uploader.upload(reqBody.avatar, {
        folder: "mezo-booking/avatars",
      });
      reqBody.avatar = {
        public_id: result.public_id,
        url: result.url,
      };
    }

    if (!reqBody.avatar) {
      delete reqBody.avatar;
    }

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
    const id = req.nextUrl.searchParams.get("id");

    const user = await User.findById(id).select("-password");

    return NextResponse.json(
      { message: "Get User Data Successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
