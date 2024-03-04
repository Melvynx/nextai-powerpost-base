import { PostMode } from "@prisma/client";
import {
  AlignJustify,
  BookText,
  Code,
  Key,
  ListFilter,
  ListOrdered,
  LucideIcon,
  Twitter,
} from "lucide-react";

export const LANGUAGES = {
  English: "🇬🇧",
  French: "🇫🇷",
  Spanish: "🇪🇸",
  German: "🇩🇪",
  Chinese: "🇨🇳",
  Japanese: "🇯🇵",
  Russian: "🇷🇺",
  Portuguese: "🇵🇹",
  Italian: "🇮🇹",
  Arabic: "🇸🇦",
} as const;

export const PostModeDataMap: Record<
  PostMode,
  { icon: LucideIcon; description: string }
> = {
  BULLET_POINT: {
    icon: ListOrdered,
    description: "Organizes content into bullet points for clarity.",
  },
  CODE: {
    icon: Code,
    description: "Displays content in a code format for technical posts.",
  },
  MAIN_POINTS: {
    icon: Key,
    description: "Highlights the key points of the content.",
  },
  SHORT: {
    icon: AlignJustify,
    description: "Presents a brief and concise version of the content.",
  },
  THREAD: {
    icon: BookText,
    description: "Formats content as a detailed, continuous thread.",
  },
  TOP3: {
    icon: ListFilter,
    description: "Focuses on the top three aspects or takeaways.",
  },
  TWEET: {
    icon: Twitter,
    description: "Formats content in a tweet-style for quick reads.",
  },
};
