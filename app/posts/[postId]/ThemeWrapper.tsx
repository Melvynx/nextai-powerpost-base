"use client";

import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { useProseConfig } from "./post-store";

export type ThemeWrapperProps = PropsWithChildren<{
  styles: Record<string, string>;
}> &
  ComponentPropsWithoutRef<"div">;

export const ThemeWrapper = ({
  className,
  styles,
  children,
  ...props
}: ThemeWrapperProps) => {
  const theme = useProseConfig((p) => p.theme) || "neutral-dark";

  const styleClass = styles[theme] || styles["neutral-dark"];

  return (
    <div
      className={cn(
        className,
        styleClass,
        "bg-background text-foreground transition-colors"
      )}
      {...props}
    >
      {children}
    </div>
  );
};
