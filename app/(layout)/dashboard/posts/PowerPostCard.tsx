import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@prisma/client";
import Link from "next/link";

export type PowerPostCardProps = {
  post: Post;
};

export const PowerPostCard = ({ post }: PowerPostCardProps) => {
  return (
    <Card key={post.id} className="overflow-hidden">
      <Link
        href={`/posts/${post.id}`}
        className="group block size-full shadow"
        style={{
          backgroundImage: `url(${post.coverUrl})`,
          backgroundSize: "cover",
          // center image
          backgroundPosition: "50% 50%",
        }}
      >
        <CardHeader className="flex h-full flex-col gap-2 p-8 text-foreground backdrop-blur-sm backdrop-brightness-50  group-hover:backdrop-brightness-75">
          <CardTitle className="text-white">{post.title}</CardTitle>
          <CardDescription className="truncate text-white">
            From {post.source}
          </CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
};
