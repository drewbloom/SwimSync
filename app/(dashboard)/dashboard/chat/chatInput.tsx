// app/(dashboard)/dashboard/chat/ChatInput.tsx
'use client';

export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  disabled
}: {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="mt-auto flex gap-2">
      <input
        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
        placeholder="Ask AI to help with entries..."
        value={input}
        onChange={onInputChange}
        disabled={disabled}
      />
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        type="submit"
        disabled={disabled}
      >
        Send
      </button>
    </form>
  );
}
