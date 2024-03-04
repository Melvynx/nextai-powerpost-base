import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/prisma";
import Link from "next/link";

export default async function Page() {
  const user = await requiredAuth();
  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Posts</LayoutTitle>
        <LayoutDescription>Find your latest created posts.</LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your posts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
