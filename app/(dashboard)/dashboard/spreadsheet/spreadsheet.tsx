"use client";
import "react-data-grid/lib/styles.css";
import { useState } from "react";
import Papa from "papaparse";
import { DataGrid } from "react-data-grid";
import { saveAs } from "file-saver";
import ChatSidebar from "../chat/chatSidebar";


export default function Home() {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as any[];

        // Dynamically generate columns
        const cols = Object.keys(data[0] || {}).map((key) => ({
          key,
          name: key,
          editable: true,
        }));

        setColumns(cols);
        setRows(data);
      },
    });
  };

  
  const handleExport = () => {
    const csv = Papa.unparse(rows, {
      delimiter: ";",
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "entries.csv");
  };

  return (
    <main className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Swim Meet Entry Builder</h1>

      <label className="text-sm font-medium">Upload Roster CSV:</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block"
      />

      {rows.length > 0 && (
        <div className="h-[500px]">
          <DataGrid
            columns={columns}
            rows={rows}
            onRowsChange={setRows}
          />
        </div>
      )}
      <button
        onClick={handleExport}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        Export CSV
      </button>

      <ChatSidebar
        onCommand={(msg) => {
          // Placeholder: Just log the command for now
          console.log("AI received:", msg);
        }}
      />


    </main>
  );
}
