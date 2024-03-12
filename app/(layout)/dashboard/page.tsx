import { auth, requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/prisma";
import { Suspense } from "react";
import { PowerPostCard } from "./posts/PowerPostCard";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await auth();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
        <LayoutDescription>Find your latest PowerPost.</LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome {user?.name}</CardTitle>
              <CardDescription>
                You can create {user?.credits} PowerPost.
              </CardDescription>
            </CardHeader>
          </Card>
          {searchParams.success ? (
            <Card>
              <CardHeader>
                <CardTitle>You got your credits ✅</CardTitle>
                <CardDescription>
                  Your account is now credited with 40 PowerPost.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : null}
          {searchParams.canceled ? (
            <Card>
              <CardHeader>
                <CardTitle>Sorry, error during your payement ❌</CardTitle>
                <CardDescription>Please retry.</CardDescription>
              </CardHeader>
            </Card>
          ) : null}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LastPowerPost />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}

const LastPowerPost = async () => {
  const user = await requiredAuth();

  const last3PowerPost = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your posts</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {last3PowerPost.map((post) => (
          <PowerPostCard post={post} key={post.id} />
        ))}
      </CardContent>
    </Card>
  );
};
