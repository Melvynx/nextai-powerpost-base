import { z } from "zod";

export const MessageSchema = z.object({
  content: z.string(),
  role: z.enum(["user", "assistant", "system"]),
});

export const MessagesSchema = z.array(MessageSchema);

export type MessagesType = z.infer<typeof MessagesSchema>;
