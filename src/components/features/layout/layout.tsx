"use client";

import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { twc } from "react-twc";

export const Layout = twc.div`max-w-4xl flex-wrap w-full flex gap-4 m-auto px-4`;

export const LayoutHeader = twc.header`flex items-start gap-1 flex-col w-full md:flex-1 min-w-[200px]`;

export const LayoutTitle = (props: ComponentPropsWithoutRef<"h1">) => {
  return <Typography {...props} variant="h2" className={cn(props.className)} />;
};

export const LayoutDescription = (props: ComponentPropsWithoutRef<"p">) => {
  return <Typography {...props} className={cn(props.className)} />;
};

export const LayoutActions = twc.div`flex items-center`;

export const LayoutContent = twc.div`w-full`;
