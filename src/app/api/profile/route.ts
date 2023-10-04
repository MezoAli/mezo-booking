import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/config/connectDB";
import { getToken } from "next-auth/jwt";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../auth/[...nextauth]/route";

connectDB();

export async function PATCH(req: NextRequest) {
  try {
    let reqBody = await req.json();
    const session = await getServerSession(OPTIONS);

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
      const oldUserAvatarPublicId = session?.user?.avatar?.public_id as string;

      if (oldUserAvatarPublicId) {
        await deleteImage(oldUserAvatarPublicId);
      }

      const result = await uploadImage(reqBody?.avatar, "mezo-booking/avatars");
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
    const token = await getToken({ req });
    console.log("token : ", token);
    if (!token) {
      throw new Error("no token available");
    }

    const user = await User.findById(id).select("-password");

    return NextResponse.json(
      { message: "Get User Data Successfully", user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
