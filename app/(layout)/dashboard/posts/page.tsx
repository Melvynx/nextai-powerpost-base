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
import { PowerPostCard } from "./PowerPostCard";

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
          <CardContent className="flex flex-col gap-2">
            {posts.map((post) => (
              <PowerPostCard post={post} key={post.id} />
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
