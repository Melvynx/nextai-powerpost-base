import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/prisma";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import rehypePrism from "rehype-prism-plus";
import { ArticleWrapper } from "./ArticleWrapper";
import { ChatPopover } from "./chat/ChatPopover";
import { PostConfig } from "./PostConfig";
import { ThemeWrapper } from "./ThemeWrapper";
import Styles from "./theme.module.css";

export default async function Page({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  if (!post) {
    notFound();
  }

  console.log({ post: post });

  return (
    <ThemeWrapper styles={Styles}>
      <Layout className="py-8">
        <LayoutHeader>
          <div
            className=" overflow-hidden rounded-lg"
            style={{
              backgroundImage: `url(${post.coverUrl})`,
            }}
          >
            <div className="flex flex-col gap-2 bg-background/50 p-8 lg:p-12">
              <LayoutTitle>{post.title}</LayoutTitle>
              <Alert className="bg-card/50">
                <AlertTitle>
                  This post is a resume of{" "}
                  <Link className="underline text-primary" href={post.source}>
                    {post.source}
                  </Link>
                  . All right reserved to the original author.
                </AlertTitle>
              </Alert>
            </div>
          </div>
        </LayoutHeader>
        <LayoutContent>
          <PostConfig />
        </LayoutContent>
        <LayoutContent className>
          <ArticleWrapper>
            <MDXRemote
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypePrism],
                },
              }}
              source={post.powerPost ?? ""}
            />
          </ArticleWrapper>
        </LayoutContent>
      </Layout>
      <ChatPopover />
    </ThemeWrapper>
  );
}
