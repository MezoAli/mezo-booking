import Room, { RoomDocument } from "@/models/roomModel";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { OPTIONS } from "../../auth/[...nextauth]/route";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const checkInDate = searchParams.get("checkInDate");
    const checkOutDate = searchParams.get("checkOutDate");
    const daysOfStay = searchParams.get("daysOfStay");
    const pricePerNight = searchParams.get("pricePerNight");
    const userSession = await getServerSession(OPTIONS);

    const room: RoomDocument | null = await Room.findById(roomId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.SITE_URL}/my-bookings`,
      cancel_url: `${process.env.SITE_URL}/rooms/${roomId}`,
      customer_email: userSession?.user.email,
      client_reference_id: crypto.randomUUID(),
      metadata: { checkInDate, checkOutDate, daysOfStay, roomId },
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(pricePerNight) * Number(daysOfStay) * 100,
            product_data: {
              name: room?.name,
              description: room?.description,
              images: [`${room?.images[0].url}`],
            },
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
