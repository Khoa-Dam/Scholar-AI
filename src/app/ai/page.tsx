"use client";

import { useState } from "react";
import ChatInterface from "@/components/ai/chat-interface";
import ChatHistory from "@/components/ai/chat-history";
import { History } from "lucide-react";

const initialChatHistory: Array<{ id: string; title: string; date: Date }> = [];
export default function Home() {
  const [chatHistory, setChatHistory] = useState(initialChatHistory);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const filteredHistory = chatHistory.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewChat = () => {
    setSelectedChat(null);
    setIsHistoryVisible(false);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChat(id);
    setIsHistoryVisible(false);
  };
  return (
    <div className="sm:flex-1 flex w-full min-h-screen">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <ChatInterface
          selectedChatId={selectedChat}
          onNewChat={(title) => {
            const newChat = {
              id: Date.now().toString(),
              title,
              date: new Date(),
            };
            setChatHistory([newChat, ...chatHistory]);
            setSelectedChat(newChat.id);
          }}
          setSelectedChat={setSelectedChat}
        />
      </div>

      {/* Chat history panel */}
      <button
        className="lg:hidden fixed top-15 right-4 z-30 p-2 bg-white rounded shadow"
        onClick={() => setIsHistoryVisible(true)}
        aria-label="Show chat history"
      >
        <History className="h-5 w-5 text-gray-700" />
      </button>

      {/* Sidebar history (slide-in/out) */}
      <ChatHistory
        history={filteredHistory}
        selectedChatId={selectedChat}
        onSelectChat={handleSelectChat}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewChat={handleNewChat}
        isVisible={isHistoryVisible}
        onClose={() => setIsHistoryVisible(false)}
      />
    </div>
  );
}
