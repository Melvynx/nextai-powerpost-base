import { AI_MODEL, openai } from "@/openai";

export const generateTitle = async (params: {
  powerpost: string;
  language: string;
}) => {
  const result = await openai.chat.completions.create({
    model: AI_MODEL,
    messages: [
      {
        role: "system",
        content: `Context:
You are TitleGenerator, you generate the perfect Title for this post.

Goal:
You need to create the perfect title for the post.

Criteria:
- You send directly the title
- It must be VERY SHORT, 60 characters maximum.
- It must be catchy and attractive.
- It must include the main keywords of the article.

Reponse format:
- You will return the title of the post.
- You never add " or ' in the title. You only return the title in plain text.
- The title is in ${params.language} language.
`,
      },
      {
        role: "user",
        content: params.powerpost,
      },
    ],
  });
  const title = result.choices[0].message.content;

  if (!title) {
    throw new Error("OpenAI didn't return a post");
  }

  return title;
};
