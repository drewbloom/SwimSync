// app/(dashboard)/dashboard/assistant/layout.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function AssistantLayout({ children }: { children: ReactNode }) {
  return (<SessionProvider>{children}</SessionProvider>);
}
