"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { useProseConfig } from "./post-store";
import { useTheme } from "next-themes";

export const ArticleWrapper = (props: PropsWithChildren) => {
  const config = useProseConfig();
  const isDark = config.theme.endsWith("dark");

  return (
    <article
      className={cn("prose m-auto", {
        "prose-xl": config.size === "xl",
        "prose-lg": config.size === "lg",
        "prose-sm": config.size === "sm",
        "prose-invert": isDark,
      })}
    >
      {props.children}
    </article>
  );
};
