"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Typography } from "@/components/ui/typography";
import { useMutation } from "@tanstack/react-query";
import { Bot, User2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import Markdown from "react-markdown";
import { toast } from "sonner";
import { MessagesType } from "./post-messages.schema";
import { readStream } from "./readStream";
export const ChatPopover = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const postId = params.postId;
  const [messages, setMessages] = useState<MessagesType>([
    {
      content: "Hello! How can I help you?",
      role: "assistant",
    },
  ]);

  const submitMutation = useMutation({
    mutationFn: async (input: string) => {
      // Créer une copie des messages en rajoutant le message de l'utilisateur
      const newMessages = [
        ...messages,
        {
          content: input,
          role: "user",
        },
      ] satisfies MessagesType;

      // Update du state avec les nouveaux messages

      setMessages([...newMessages]);

      // Envoie de la requête
      const response = await fetch(`/api/powerpost/${postId}/chat`, {
        method: "POST",
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response) {
        setMessages((prev) => [
          ...prev,
          {
            content: "An error occurred while sending the message.",
            role: "assistant",
          },
        ]);

        return;
      }

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            content: "An error occurred while sending the message.",
            role: "assistant",
          },
        ]);

        return;
      }

      const data = response.body;

      if (!data) {
        setMessages((prev) => [
          ...prev,
          {
            content: "An error occurred while sending the message.",
            role: "assistant",
          },
        ]);
        return;
      }

      // Ajouter un message de l'assistant vide
      newMessages.push({
        content: "",
        role: "assistant",
      });

      setMessages([...newMessages]);

      // Lire la stream
      // Chunk représente le message de l'assistant
      await readStream(data, (chunk) => {
        newMessages[newMessages.length - 1].content = chunk;
        setMessages([...newMessages]);
      });
    },
  });

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-4 left-4 rounded-full"
          variant="secondary"
          size="icon"
          onClick={() => setOpen(!open)}
        >
          <Bot />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{
          height: "min(80vh, 600px)",
          width: "min(90vw, 400px)",
        }}
        className="divide-y flex relative flex-col divide-foreground/20 p-0 mx-4"
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 rounded-full"
          onClick={() => setOpen(false)}
        >
          <X size={16} />
        </Button>
        <Typography className="p-3" variant="h3">
          Chat
        </Typography>
        <div className="flex flex-1 flex-col gap-4 overflow-auto p-4">
          {messages.map((message, i) => (
            <div key={message.role + i} className="group reltaive">
              <Typography variant="small" className="flex items-cewnter gap-2">
                {message.role === "user" ? (
                  <User2 size={12} />
                ) : (
                  <Bot size={12} />
                )}
                <span>{message.role}</span>
              </Typography>
              <Markdown className="prose dark:prose-invert prose-sm">
                {message.content}
              </Markdown>
            </div>
          ))}
        </div>
        <form
          className="p-3"
          onSubmit={(e) => {
            e.preventDefault();

            if (submitMutation.isPending) {
              return;
            }

            const formData = new FormData(e.currentTarget);

            const input = formData.get("input") as string;

            if (!input) {
              toast.error("Please type a message");
              return;
            }

            submitMutation.mutate(input);
            e.currentTarget.reset();
          }}
        >
          <Input
            disabled={submitMutation.isPending}
            placeholder="Type a message"
            type="text"
            name="input"
          />
        </form>
      </PopoverContent>
    </Popover>
  );
};
