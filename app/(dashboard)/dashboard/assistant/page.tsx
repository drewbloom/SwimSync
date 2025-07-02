// app/(dashboard)/dashboard/assistant/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { Chat } from '@/components/assistant/chat';
import { DataStreamHandler } from '@/components/assistant/data-stream-handler';
import { generateUUID } from '@/lib/assistant/utils';
import { useSession } from 'next-auth/react';
import { DEFAULT_CHAT_MODEL } from '@/lib/assistant/ai/models';

export default function AssistantPage() {
  const [chatId, setChatId] = useState('');
  const { data: session, status } = useSession();

  useEffect(() => {
    setChatId(generateUUID());
  }, []);

  if (status === 'loading') return null;

  if (!session) {
    // Optional: redirect or render a login prompt
    return <p>You must be signed in to use the assistant.</p>;
  }

  return (
    <>
      <Chat
        key={chatId}
        id={chatId}
        initialMessages={[]}
        initialChatModel={DEFAULT_CHAT_MODEL}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={chatId} />
    </>
  );
}
