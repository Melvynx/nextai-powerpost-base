import { stripe } from "@/stripe";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../prisma";

export const { handlers, auth: baseAuth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
  },
  events: {
    createUser: async (message) => {
      const userId = message.user.id;
      const userEmail = message.user.email;

      if (!userId || !userEmail) return;

      const stripeCustomer = await stripe.customers.create({
        email: userEmail,
        name: message.user.name ?? undefined,
        metadata: {
          id: userId,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
    },
  },
});
