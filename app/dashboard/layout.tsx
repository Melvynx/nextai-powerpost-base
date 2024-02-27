import Link from "next/link";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  return (
    <div className="max-w-5xl m-auto px-4 h-full">
      <nav className="flex items-center gap-4 mt-4">
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
      <div className="mt-8">{props.children}</div>
    </div>
  );
}
