import { auth } from "@/auth/helper";
import {
  Layout,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/layout";

export default async function Page({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const user = await auth();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Post page reader</LayoutTitle>
        <LayoutDescription>
          Here will be the reading for a created PowerPost. (POST ID ={" "}
          {params.postId})
        </LayoutDescription>
      </LayoutHeader>
    </Layout>
  );
}
