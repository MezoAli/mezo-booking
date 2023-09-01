import connectDB from "@/config/connectDB";
import Room from "@/models/roomModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(req: NextRequest) {
  // await Room.create({ name: "         nono         " });
  return NextResponse.json({ message: "get rooms" }, { status: 200 });
}
