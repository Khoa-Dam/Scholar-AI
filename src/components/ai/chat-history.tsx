"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatHistoryProps {
  history: { id: string; title: string; date: Date }[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNewChat: () => void;
  isVisible: boolean;
  onClose: () => void;
}

export default function ChatHistory({
  history,
  selectedChatId,
  onSelectChat,
  searchQuery,
  onSearchChange,
  onNewChat,
  isVisible,
  onClose,
}: ChatHistoryProps) {
  // Slide-in/out bằng translate-x
  return (
    <div
      className={`
    fixed inset-y-0 right-0 z-100
    w-80 max-w-full bg-white shadow-lg
    transform transition-transform duration-300
    lg:relative lg:translate-x-0 lg:shadow-none
    ${isVisible ? "translate-x-0" : "translate-x-full"}
  `}
    >
      {/* Header: New + Close */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button onClick={onNewChat} className="text-xs sm:text-sm">
          + New Chat
        </Button>
        {/* Nút đóng hiện trên cả mobile và iPad */}
        <button
          className="lg:hidden p-1"
          onClick={onClose}
          aria-label="Close history"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            {searchQuery ? "No results found" : "No conversations yet"}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {history.map((chat) => (
              <li
                key={chat.id}
                className={`
                  p-4 cursor-pointer transition-colors
                  ${
                    selectedChatId === chat.id
                      ? "bg-violet-50 hover:bg-violet-100"
                      : "hover:bg-gray-100"
                  }
                `}
                onClick={() => onSelectChat(chat.id)}
              >
                <p className="text-sm font-medium truncate">{chat.title}</p>
                <p className="text-xs text-gray-500">
                  {chat.date.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year:
                      chat.date.getFullYear() !== new Date().getFullYear()
                        ? "numeric"
                        : undefined,
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
