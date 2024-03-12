import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { PostForm } from "./PostForm";

export default async function Page() {
  const user = await requiredAuth();

  if (user.credits <= 0) {
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>New posts</LayoutTitle>
          <LayoutDescription>Create your post.</LayoutDescription>
        </LayoutHeader>
        <LayoutContent className="flex flex-col gap-4">
          <Alert>
            <AlertTriangle size={20} />
            <div>
              <AlertTitle>
                You don't have enough credits to create a new post
              </AlertTitle>
              <Link
                className={buttonVariants({ size: "sm" })}
                href="/dashboard/credits"
              >
                Buy credits plan
              </Link>
            </div>
          </Alert>
        </LayoutContent>
      </Layout>
    );
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>New posts</LayoutTitle>
        <LayoutDescription>Create your post.</LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <PostForm />
      </LayoutContent>
    </Layout>
  );
}
