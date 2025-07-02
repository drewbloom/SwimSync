// app/(dashboard)/dashboard/page.tsx
'use client';

import Spreadsheet from './spreadsheet/spreadsheet';
import AssistantPage from './assistant/page';

export default function SwimSyncDashboard() {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] p-4 gap-4">
      <div className="flex-1 overflow-auto border rounded bg-white">
        <Spreadsheet />
      </div>
      <div className="w-full md:w-[400px]">
        <AssistantPage />
      </div>
    </div>
  );
}
