import type { ReactNode } from "react";

interface ChatMessageProps {
  content: string | ReactNode;
  isUser: boolean;
}

export default function ChatMessage({ content, isUser }: ChatMessageProps) {
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} w-full p-40`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-4 ${
          isUser ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-900"
        }`}
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          maxWidth: "100%",
        }}
      >
        {content}
      </div>
    </div>
  );
}
