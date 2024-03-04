import { PostMode } from "@prisma/client";
import { z } from "zod";

export const PostSchema = z.object({
  source: z.string().url(),
  mode: z.nativeEnum(PostMode),
  language: z.string().default("English"),
});

export type PostSchema = z.infer<typeof PostSchema>;
