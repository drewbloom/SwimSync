export function MessageList({
  messages,
}: {
  messages: { role: 'user' | 'assistant'; content: string }[];
}) {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
      {messages.map((msg, i) => (
        <div key={i} className="text-sm">
          <span className="font-bold">{msg.role === 'user' ? 'You' : 'AI'}:</span>{' '}
          {msg.content}
        </div>
      ))}
    </div>
  );
}
