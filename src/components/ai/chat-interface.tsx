"use client";

import React from "react";
import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Image from "next/image";

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
  // Tạo một key dựa trên selectedChatId để reset chat khi ID thay đổi
  const chatKey = selectedChatId || `new-chat-${Date.now()}`;

  // Kết nối với API chat - dùng key để reset chat
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
    id: chatKey,
  });

  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevSelectedChatIdRef = useRef<string | null>(selectedChatId);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset messages khi selectedChatId thay đổi sang null (new chat)
  useEffect(() => {
    if (prevSelectedChatIdRef.current !== null && selectedChatId === null) {
      // Nếu từ có chat sang không chat (new chat), xóa messages
      setMessages([]);
    }
    prevSelectedChatIdRef.current = selectedChatId;
  }, [selectedChatId, setMessages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    // Kiểm tra tin nhắn trống
    if (!input.trim()) {
      e.preventDefault();
      return;
    }

    // Submit the message with any attachments
    handleSubmit(e, {
      experimental_attachments: files,
    });

    // Clear files after sending
    setFiles(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Create new chat if needed - chỉ tạo khi không có chat được chọn
    if (!selectedChatId && input.trim()) {
      const newChatId = Date.now().toString();
      onNewChat(input.trim());
      setSelectedChat(newChatId);
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Chat messages - cải thiện cấu trúc CSS */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="absolute inset-0 overflow-y-auto p-4 space-y-4 hide-scrollbar"
          style={{
            overflowX: "hidden",
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center min-h-[calc(100vh-160px)]">
              <div className="text-center text-gray-500">
                <h3 className="text-lg font-medium">
                  Start a new conversation
                </h3>
                <p className="mt-1">Type a message to begin</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  } w-full mb-4`}
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
                    }}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div>
                      {message?.experimental_attachments
                        ?.filter((attachment) =>
                          attachment?.contentType?.startsWith("image/")
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
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Message input - Cố định vị trí ở dưới cùng */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleFormSubmit} className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              className="hidden"
              onChange={(event) => {
                if (event.target.files) {
                  setFiles(event.target.files);
                }
              }}
              multiple
              ref={fileInputRef}
              accept="image/*"
            />
            {/* <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button> */}
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
            >
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

      {/* CSS để ẩn thanh cuộn */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </div>
  );
}
