import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcryptjs";
import connectDB from "@/config/connectDB";
import { v2 as cloudinary } from "cloudinary";

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    let reqBody = await req.json();

    const findUser = await User.findOne({ email: reqBody.email });
    if (findUser) {
      throw new Error("user already exists");
    }
    const isEmail = validator.isEmail(reqBody.email);
    if (!isEmail) {
      throw new Error("please enter a valid email");
    }

    if (reqBody.password.length < 6) {
      throw new Error("password should be atleast 6 characters");
    }

    const avatar: string = reqBody.avatar;

    const result = await cloudinary.uploader.upload(avatar, {
      folder: "mezo-booking/avatars",
    });

    const hashPassword = await bcrypt.hash(reqBody.password, 12);
    reqBody.password = hashPassword;
    reqBody.avatar = {
      public_id: result.public_id,
      url: result.url,
    };

    const user = await User.create(reqBody);

    return NextResponse.json(
      { message: "user created Successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
