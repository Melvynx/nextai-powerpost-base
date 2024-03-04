"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AccordionTrigger } from "@radix-ui/react-accordion";
import { ALargeSmall, ArrowDown, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ThemeMapping, useProseConfig } from "./post-store";

export const PostConfig = () => {
  const [open, setOpen] = useState<string>("");
  const theme = useTheme();
  const config = useProseConfig();
  return (
    <Card>
      <Accordion type="single" value={open}>
        <AccordionItem value="random">
          <AccordionContent className="p-2 flex items-center gap-4 flex-wrap">
            <Card className="flex flex-col items-start p-2">
              <Label>Size</Label>
              <ToggleGroup
                type="single"
                value={config.size}
                onValueChange={(v) => {
                  config.setConfig({ size: v as never });
                }}
              >
                <ToggleGroupItem value="sm">
                  <ALargeSmall size={14} />
                </ToggleGroupItem>
                <ToggleGroupItem value="default">
                  <ALargeSmall size={20} />
                </ToggleGroupItem>
                <ToggleGroupItem value="lg">
                  <ALargeSmall size={24} />
                </ToggleGroupItem>
                <ToggleGroupItem value="xl">
                  <ALargeSmall size={30} />
                </ToggleGroupItem>
              </ToggleGroup>
            </Card>
            <Card className="flex flex-col items-start p-2">
              <Label>Size</Label>
              <ToggleGroup
                type="single"
                value={config.theme}
                onValueChange={(v) => {
                  if (config.theme === v) return;
                  config.setConfig({ theme: v as never });
                  theme.setTheme(v.endsWith("dark") ? "dark" : "light");
                }}
              >
                {Object.entries(ThemeMapping).map(([key, value]) => {
                  return (
                    <ToggleGroupItem key={key} value={key}>
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundImage: `linear-gradient(45deg, ${value.color1}, ${value.color2})`,
                        }}
                      />
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </Card>
          </AccordionContent>
          <AccordionTrigger
            onClick={() => {
              setOpen((p) => (p ? "" : "random"));
            }}
            asChild
          >
            <Button size="sm" variant="ghost" className="w-full">
              {open === "random" ? (
                <ArrowUp size={16} />
              ) : (
                <ArrowDown size={16} />
              )}
            </Button>
          </AccordionTrigger>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
