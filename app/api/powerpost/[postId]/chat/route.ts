import { requiredAuth } from "@/auth/helper";
import { AI_MODEL, openai } from "@/openai";
import { prisma } from "@/prisma";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  MessagesSchema,
  MessagesType,
} from "../../../../posts/[postId]/chat/post-messages.schema";

const BodySchema = z.object({
  messages: MessagesSchema,
});

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      postId: string;
    };
  }
) => {
  const rawBody = await req.json();

  const body = BodySchema.parse(rawBody);

  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
    select: {
      id: true,
      content: true,
      title: true,
      userId: true,
    },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  const user = await requiredAuth();

  if (user.id !== post.userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const messages: MessagesType = [];

  messages.push({
    content: `Context:
You task is to chat with the user about the post I will give you, the subject is about ${post.title}.
You need to ONLY answer the user's questions and help him with the post.

Critieria:
- Create short and clear messages
- Be polite and helpful
- If the user ask you an out of context question, answer with "I'm sorry, I can't help you with that."

Post:
"""
${post.content}
"""
`,
    role: "system",
  });

  messages.push(...body.messages.slice(-5));

  console.log({ messages });

  const response = await openai.chat.completions.create({
    model: AI_MODEL,
    temperature: 0.7,
    messages: messages as never,
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
};
