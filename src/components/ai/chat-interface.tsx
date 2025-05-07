"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<Record<string, Message[]>>({}); // Store messages for each chat
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Restore messages when selected chat changes
  useEffect(() => {
    if (selectedChatId) {
      // Restore messages for the selected chat
      setMessages(chatHistory[selectedChatId] || []);
    } else {
      // Clear messages if no chat is selected
      setMessages([]);
    }
  }, [selectedChatId, chatHistory]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Create user message with a unique ID
    const userMessage: Message = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      content: input,
      role: "user",
    };

    // If this is a new chat, create it with the first message as title
    if (!selectedChatId) {
      const newChatId = Date.now().toString();
      onNewChat(input);
      setSelectedChat(newChatId);
      setChatHistory((prev) => ({
        ...prev,
        [newChatId]: [userMessage],
      }));
      setMessages([userMessage]);
    } else {
      // Add user message to the current chat
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setChatHistory((prev) => ({
        ...prev,
        [selectedChatId]: updatedMessages,
      }));
    }

    // Clear input
    setInput("");
  };

  // Simulate assistant response after the chat is created
  useEffect(() => {
    if (
      selectedChatId &&
      messages.length > 0 &&
      messages[messages.length - 1].role === "user" &&
      !messages.some(
        (msg) =>
          msg.role === "assistant" &&
          msg.content.includes(messages[messages.length - 1].content)
      )
    ) {
      const input = messages[messages.length - 1].content;
      setTimeout(() => {
        const assistantMessage: Message = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
          content: `This is a simulated response to: "${input}"`,
          role: "assistant",
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setChatHistory((prev) => ({
          ...prev,
          [selectedChatId]: [...(prev[selectedChatId] || []), assistantMessage],
        }));
      }, 1000);
    }
  }, [selectedChatId, messages]);

  return (
    <div className="flex flex-col h-full w-full flex-1 ">
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
                {message.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 mb-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
