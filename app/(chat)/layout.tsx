import { cookies } from 'next/headers';
import { SessionProvider } from 'next-auth/react';
import getServerSession from 'next-auth';
import { AppSidebar } from '@/components/assistant/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/assistant/ui/sidebar';
import { authConfig } from '@/lib/auth/config';
import Script from 'next/script';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([
    getServerSession(authConfig),
    cookies()
  ]);

  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <SessionProvider session={session}>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      />
      <SidebarProvider defaultOpen={!isCollapsed}>
        <AppSidebar user={session?.user} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
