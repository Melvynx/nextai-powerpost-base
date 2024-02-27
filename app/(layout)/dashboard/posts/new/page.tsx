import { auth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/layout";

export default async function Page() {
  const user = await auth();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>New posts</LayoutTitle>
        <LayoutDescription>Create your post.</LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4"></LayoutContent>
    </Layout>
  );
}
