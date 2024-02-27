import { Layout } from "@/components/features/layout/layout";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function NextLayout(props: PropsWithChildren) {
  return (
    <div className="max-w-5xl m-auto px-4 h-full">
      <Layout asChild>
        <nav>
          <Link
            href="/dashboard/posts"
            className="flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors bg-accent/20 hover:bg-accent/50"
          >
            Created posts
          </Link>
          <Link
            href="/dashboard/posts/new"
            className="flex h-8 items-center gap-2 rounded-md px-2 text-sm transition-colors bg-accent/20 hover:bg-accent/50"
          >
            New posts
          </Link>
        </nav>
      </Layout>
      <div className="mt-8">{props.children}</div>
    </div>
  );
}
