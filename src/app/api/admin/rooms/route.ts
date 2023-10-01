import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { OPTIONS } from "../../auth/[...nextauth]/route";
import Room from "@/models/roomModel";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(OPTIONS);
    if (session?.user?.role !== "admin") {
      throw new Error("Only Admin Can Show This Route");
    }
    const rooms = await Room.find();

    return NextResponse.json(
      { message: "get room successfully", rooms },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
