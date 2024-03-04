import { NextResponse } from "next/server";
import { PostSchema } from "../../(layout)/dashboard/posts/new/post.schema";

export const POST = async (req: Request) => {
  const body = await req.json();

  console.log("body", body);

  const data = PostSchema.parse(body);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  return NextResponse.json(data);
};
