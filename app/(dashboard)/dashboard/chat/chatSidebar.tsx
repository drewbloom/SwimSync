// app/(dashboard)/dashboard/chat/ChatSidebar.tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { MessageList } from './messageList';
import { ChatInput } from './chatInput';

export default function ChatSidebar() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error
  } = useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <aside className="w-full md:w-1/3 border-l border-gray-200 p-4 bg-white flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">AI Assistant</h2>
      <MessageList messages={messages} />
      <div ref={bottomRef} />
      <ChatInput
        input={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
    </aside>
  );
}
