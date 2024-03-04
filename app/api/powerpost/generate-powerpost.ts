import { openai } from "@/openai";
import { PostMode } from "@prisma/client";
import { getPowerPostPrompt } from "./get-powerpost-prompt";

export const generatePowerPost = async (params: {
  markdown: string;
  mode: PostMode;
  language: string;
}) => {
  const result = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: getPowerPostPrompt({
          language: params.language,
          mode: params.mode,
        }),
      },
      {
        role: "user",
        content: params.markdown,
      },
    ],
  });
  const post = result.choices[0].message.content;

  if (!post) {
    throw new Error("OpenAI didn't return a post");
  }

  return post;
};
