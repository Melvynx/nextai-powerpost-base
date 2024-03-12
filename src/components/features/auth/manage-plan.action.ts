"use server";

import { requiredAuth } from "@/auth/helper";
import { getServerUrl } from "@/getServerUrl";
import { stripe } from "@/stripe";

export const managePlanAction = async () => {
  const user = await requiredAuth();

  const stripeCustomerId = user.stripeCustomerId;

  if (!stripeCustomerId) {
    throw new Error("User has no stripe customer id");
  }

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId ?? "",
    return_url: `${getServerUrl()}/dashboard`,
  });

  if (!stripeSession.url) {
    throw new Error("Stripe session has no url");
  }

  return stripeSession.url;
};
