import { create } from "zustand";
import { persist } from "zustand/middleware";

/* Tu pourras rajouter d'autre thème */
export const ThemeMapping = {
  "red-light": {
    color1: "hsl(0 0% 100%)",
    color2: "hsl(346.8 77.2% 49.8%)",
  },
  "blue-light": {
    color1: "hsl(0 0% 100%)",
    color2: "hsl(221.2 83.2% 53.3%)",
  },
  "green-light": {
    color1: "hsl(0 0% 100%)",
    color2: "hsl(142.1 76.2% 36.3%)",
  },
  "neutral-light": {
    color1: "hsl(0 0% 100%)",
    color2: "hsl( 0 0% 9%)",
  },
  "red-dark": {
    color1: "hsl(20 14.3% 4.1%)",
    color2: "hsl(346.8 77.2% 49.8%)",
  },
  "blue-dark": {
    color1: "hsl(222.2 84% 4.9%)",
    color2: "hsl(217.2 91.2% 59.8%)",
  },
  "green-dark": {
    color1: "hsl(20 14.3% 4.1%)",
    color2: "hsl(142.1 70.6% 45.3%)",
  },
  "neutral-dark": {
    color1: "hsl(0 0% 3.9%)",
    color2: "hsl(0 0% 98%)",
  },
} as const;

type PostConfigStore = {
  size: "sm" | "default" | "lg" | "xl";
  theme: keyof typeof ThemeMapping;
  setConfig: (config: Partial<PostConfigStore>) => void;
};

export const useProseConfig = create(
  persist<PostConfigStore>(
    (set) => ({
      size: "default",
      theme: "neutral-light",
      setConfig: (config) => set(config),
    }),
    {
      name: "mdx-prose-config",
    }
  )
);
