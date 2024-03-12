import { auth } from "@/auth/helper";
import { SubmitButton } from "@/components/features/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { getServerUrl } from "@/getServerUrl";
import { stripe } from "@/stripe";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";

export default function PricingSection() {
  return (
    <section className="bg-background ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-foreground">
            Pay what you use.
          </h2>
          <p className="mb-5 font-light text-muted-foreground sm:text-xl">
            We use a simple token system to pay for your usage.
          </p>
        </div>
        <div className="flex max-lg:flex-col">
          <div className="flex flex-col p-6 mx-auto text-center rounded-lg border max-w-md w-full shadow border-border bg-card xl:p-8 h-fit">
            <h3 className="mb-4 text-2xl font-semibold">Free</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Only 2 tokens.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$0</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                <Check className="text-green-500" size={16} />
                <span>Get 2 tokens for free</span>
              </li>
            </ul>
            <a
              href="/api/auth/signin"
              className={buttonVariants({ variant: "secondary" })}
            >
              Get started
            </a>
          </div>
          <div className="flex flex-col p-6 mx-auto text-center rounded-lg border max-w-md w-full shadow border-border bg-card xl:p-8 h-fit">
            <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              Get 40 powerpost every months.
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className="mr-2 text-5xl font-extrabold">$9</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                <Check className="text-green-500" size={16} />
                <span>40 powerpost</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="text-green-500" size={16} />
                <span>AI Chat for every post</span>
              </li>
            </ul>
            <form>
              <SubmitButton
                formAction={async () => {
                  "use server";

                  const user = await auth();

                  if (!user) {
                    redirect("/api/auth/signin");
                  }

                  if (!user.stripeCustomerId) {
                    throw new Error("User has no stripe customer id");
                  }

                  const stripeSession = await stripe.checkout.sessions.create({
                    customer: user.stripeCustomerId,
                    mode: "subscription",
                    payment_method_types: ["card", "link"],
                    allow_promotion_codes: true,
                    line_items: [
                      {
                        quantity: 1,
                        price:
                          process.env.NODE_ENV === "development"
                            ? "price_1OtL68DRUFwrgphiJVurY1f0"
                            : "price_1OtLMFDRUFwrgphiMtRZNMND",
                      },
                    ],
                    success_url: `${getServerUrl()}/dashboard?success=true`,
                    cancel_url: `${getServerUrl()}/dashboard?canceled=true`,
                  });

                  if (!stripeSession.url) {
                    throw new Error("Stripe session has no url");
                  }

                  redirect(stripeSession.url);
                }}
              >
                Get started
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
