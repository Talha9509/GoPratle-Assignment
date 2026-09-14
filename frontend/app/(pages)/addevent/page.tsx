"use client";
import Link from "next/link";
import AddEventFormm from "@/components/Form/AddEventForm";

export default function AddEventPage() {
  return (
    <div className="min-h-screen bg-[#EBE9E1] flex flex-col">
      <header className="sticky top-0 z-10 border-b border-[#3a2a1a] bg-[#000000]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition bg-[#2d1e10] text-[#fbb87a] hover:bg-[#3a2a1a]"
            >
              ← Back
            </Link>
            <Link href={`/`}>
            <span className="text-xl font-bold text-[#d4c4b6]"> GoPratle</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 w-full flex-1">
        <AddEventFormm />
      </main>

      <footer className="border-t border-[#e2c9a8] mt-auto py-6 text-center text-sm text-[#9c7a5a]">
        © {new Date().getFullYear()} GoPratle
      </footer>
    </div>
  );
}
