import { prisma } from "@/prisma";
import { stripe } from "@/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const rawBody = await req.text();

  const sig = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event | undefined;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook secret error" },
      { status: 400 }
    );
  }

  console.log("Event type", event.type);
  if (event.type === "checkout.session.completed") {
    const customerId = event.data.object.customer as string;

    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  }
  if (event.type === "invoice.paid") {
    const customerId = event.data.object.customer as string;

    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        credits: {
          increment: 40,
        },
      },
    });
  }

  return NextResponse.json({ received: true });
};
