import connectDB from "@/config/connectDB";
import Booking from "@/models/bookingModel";
import Room, { RoomDocument } from "@/models/roomModel";
import User from "@/models/userModel";
import { User as UserType } from "@/types/userType";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connectDB();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = headers().get("Stripe-Signature");

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const user = (
        await User.findOne({
          email: session?.customer_email,
        })
      ).id;
      const room = session?.metadata?.roomId;
      const checkInDate = new Date(session?.metadata?.checkInDate);
      const checkOutDate = new Date(session?.metadata?.checkOutDate);
      const paidAt = new Date();
      const amountPaid = session?.amount_total / 100;
      const daysOfStay = Number(session?.metadata?.daysOfStay);
      const paymentInfo = {
        id: session?.payment_intent,
        status: session?.payment_status,
      };

      const booking = await Booking.create({
        room,
        user,
        checkInDate,
        checkOutDate,
        paidAt,
        amountPaid,
        daysOfStay,
        paymentInfo,
      });

      return NextResponse.json(
        { message: "Booking Created Successfully", booking },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
