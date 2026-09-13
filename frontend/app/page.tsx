"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Event, GetAllEventsResponse } from "@/types/event";
import EventCard from '@/components/EventCard'
import Link from "next/link";

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#e2c9a8] bg-white overflow-hidden">
      <div className="h-2 w-full bg-[#fbb87a] animate-pulse" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-4 w-24 rounded bg-[#f5e6d3] animate-pulse" />
        <div className="h-5 w-3/4 rounded bg-[#f5e6d3] animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-[#f5e6d3] animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-[#f5e6d3] animate-pulse" />
      </div>
    </div>
  );
}

export default function Home() {
  const backend = process.env.NEXT_PUBLIC_BACKEND;
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backend}/api/events`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data: GetAllEventsResponse = await response.json();
        setEvents(data.events);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [backend]);

  return (
    <main className="min-h-screen bg-[#EBE9E1]">

      {/* ── header ── */}
      <header className="sticky top-0 z-10 border-b border-[#3a2a1a] bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#EBE9E1]">GoPratle</span>
          </div>
        </div>
      </header>

      {/* ── hero ── */}
      <section className="py-12 px-4 text-center border-b border-[#e2c9a8]">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-[#000000]">
          Discover Events
        </h1>
        <p className="text-lg max-w-xl mx-auto text-[#6b4f35]">
          Browse planners, performers, and crew available for your next event.
        </p>
      </section>

      {/* ── content ── */}
      <section className="max-w-6xl mx-auto px-4 py-10">

        {!loading && !error && (
          <Link href={'addevent'} className="mb-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-md font-semibold bg-[#e43d12] text-white">
              Add Event
            </span>
          </Link>
        )}

        {/* loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* error state */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-lg font-semibold text-red-700">⚠ {error}</p>
            <p className="text-sm mt-1 text-[#9c7a5a]">
              Something went wrong
              <code className="font-mono">{backend}</code>
            </p>
          </div>
        )}

        {/* empty state */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-xl font-semibold text-[#1c1410]">No events yet</p>
            <p className="text-sm mt-1 text-[#9c7a5a]">
              Add some events via the API to see them here.
            </p>
          </div>
        )}

        {/* event grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* ── footer ── */}
      <footer className="border-t border-[#e2c9a8] mt-auto py-6 text-center text-sm text-[#9c7a5a]">
        © {new Date().getFullYear()} GoPratle
      </footer>
    </main>
  );
}
