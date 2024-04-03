"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/typography";
import { useMutation } from "@tanstack/react-query";
import { motion, useSpring } from "framer-motion";
import {
  ArrowDown,
  Bot,
  Check,
  Copy,
  Square,
  Trash2,
  User2,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { MessagesType } from "./post-messages.schema";
import { readStream } from "./readStream";
export const ChatPopover = () => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const postId = params.postId;
  const [messages, setMessages] = useState<MessagesType>([]);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const messagesContainer = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

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

      const abortController = new AbortController();
      const response = await fetch(`/api/powerpost/${postId}/chat`, {
        method: "POST",
        body: JSON.stringify({
          messages: newMessages,
        }),
        signal: abortController.signal,
      });

      abortControllerRef.current = abortController;

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

  useEffect(() => {
    if (!isAutoScrollEnabled || !messagesContainer.current) return;

    messagesContainer.current.scrollTop =
      messagesContainer.current.scrollHeight;
  }, [messages, isAutoScrollEnabled]);

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
        <div
          ref={messagesContainer}
          onWheel={(e) => {
            if (!e.isTrusted) return;

            setIsAutoScrollEnabled(false);
          }}
          className="flex flex-1 flex-col gap-4 overflow-auto p-4"
        >
          {messages.map((message, i) => (
            <div key={message.role + i} className="group relative">
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
              <div className="absolute group-hover:flex right-1 top-1 hidden flex-col gap-1">
                <Button
                  type="button"
                  className="size-6 p-0 text-muted-foreground"
                  variant={"ghost"}
                  disabled={submitMutation.isPending}
                  onClick={() => {
                    setMessages((prev) =>
                      prev.filter((_, index) => index !== i)
                    );
                  }}
                >
                  <Trash2 size={12} />
                </Button>
                <CopyButton markdown={message.content} />
              </div>
            </div>
          ))}

          {submitMutation.isPending &&
          messages[messages.length - 1]?.role === "user" ? (
            <div className="flex flex-col gap-1">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          ) : null}
        </div>
        <div className="p-3 relative">
          <div className="absolute inset-x-0 -top-8 flex items-start px-4">
            {!isAutoScrollEnabled && (
              <Button
                type="button"
                className="size-6 p-0"
                variant={"ghost"}
                onClick={() => {
                  setIsAutoScrollEnabled(true);
                }}
              >
                <ArrowDown size={12} />
              </Button>
            )}
            {submitMutation.isPending && (
              <Button
                type="button"
                className="size-6 p-0"
                variant={"ghost"}
                onClick={() => {
                  abortControllerRef.current?.abort();
                }}
              >
                <Square size={12} />
              </Button>
            )}
            {messages.length > 1 && (
              <Button
                type="button"
                className="size-6 p-0"
                variant={"ghost"}
                onClick={() => {
                  abortControllerRef.current?.abort();
                  setMessages([
                    {
                      content: "Hello! How can I help you?",
                      role: "assistant",
                    },
                  ]);
                }}
              >
                <Trash2 size={12} />
              </Button>
            )}
          </div>
          <AutoResizeTextArea
            isPending={submitMutation.isPending}
            onSubmit={(input) => {
              submitMutation.mutate(input);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const AutoResizeTextArea = ({
  isPending,
  onSubmit,
}: {
  isPending: boolean;
  onSubmit: (input: string) => void;
}) => {
  const defaultHeight = 38;
  const motionHeight = useSpring(defaultHeight, {
    bounce: 0,
  });

  return (
    <motion.textarea
      className="hide-scrollbar flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isPending}
      rows={1}
      style={{
        height: motionHeight,
      }}
      placeholder="Type a message"
      onChange={(e) => {
        const textarea = e.currentTarget;

        if (textarea.value === "") {
          motionHeight.set(defaultHeight);
          return;
        }

        motionHeight.set(Math.max(38, textarea.scrollHeight));
      }}
      onKeyDown={(e) => {
        if (isPending) {
          return;
        }

        if (e.key === "Enter") {
          e.preventDefault();

          const textarea = e.currentTarget;

          onSubmit(textarea.value);
          textarea.value = "";
          motionHeight.set(defaultHeight);
        }
      }}
    />
  );
};

const CopyButton = ({ markdown }: { markdown: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      className="size-6 p-0 text-muted-foreground"
      variant={"ghost"}
      onClick={() => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </Button>
  );
};
