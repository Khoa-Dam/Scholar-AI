"use client";

import React from "react";
import { useChat } from '@ai-sdk/react';
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import Image from 'next/image';

interface ChatInterfaceProps {
  selectedChatId: string | null;
  onNewChat: (title: string) => void;
  setSelectedChat: (id: string) => void;
}

export default function ChatInterface({
  selectedChatId,
  onNewChat,
  setSelectedChat,
}: ChatInterfaceProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    // Submit the message with any attachments
    handleSubmit(e, {
      experimental_attachments: files,
    });

    // Clear files after sending
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Create new chat if needed
    if (!selectedChatId && input.trim()) {
      const newChatId = Date.now().toString();
      onNewChat(input.trim());
      setSelectedChat(newChatId);
    }
  };

  return (
    <div className="flex flex-col h-full w-full flex-1">
      {/* Chat messages */}
      <div
        className="w-full sm:flex-1 flex-1 overflow-y-auto p-4 space-y-4"
        style={{ overflowX: "hidden", maxWidth: "100%" }}
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <h3 className="text-lg font-medium">Start a new conversation</h3>
              <p className="mt-1">Type a message to begin</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } w-full`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-violet-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  width: "auto",
                  maxWidth: "100%",
                }}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div>
                  {message?.experimental_attachments
                    ?.filter(attachment =>
                      attachment?.contentType?.startsWith('image/'),
                    )
                    .map((attachment, index) => (
                      <Image
                        key={`${message.id}-${index}`}
                        src={attachment.url}
                        width={500}
                        height={500}
                        alt={attachment.name ?? `attachment-${index}`}
                        className="rounded-lg mt-2"
                      />
                    ))}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 mb-4">
        <form onSubmit={handleFormSubmit} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              className="hidden"
              onChange={event => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              multiple
              ref={fileInputRef}
              accept="image/*"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {files && files.length > 0 && (
            <div className="text-sm text-gray-500">
              {files.length} file(s) selected
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
