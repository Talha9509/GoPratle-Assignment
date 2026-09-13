"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Event, GetEventByIdResponse } from "@/types/event";
import { formatDateLong } from "@/utils/formatDate";
import { getCategoryClasses } from "@/utils/categoryBadge";
import { CategoryDetails } from '@/components/EventDetails'

function Skeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-6 w-32 rounded mb-6 bg-[#f5e6d3]" />
      <div className="rounded-2xl border border-[#e2c9a8] bg-white overflow-hidden">
        <div className="h-32 w-full bg-[#f5e6d3]" />
        <div className="p-6 flex flex-col gap-4">
          <div className="h-7 w-2/3 rounded bg-[#f5e6d3]" />
          <div className="h-4 w-1/3 rounded bg-[#f5e6d3]" />
          <div className="h-4 w-1/2 rounded bg-[#f5e6d3]" />
          <div className="h-4 w-2/5 rounded bg-[#f5e6d3]" />
        </div>
      </div>
    </div>
  );
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const backend = process.env.NEXT_PUBLIC_BACKEND;
  const id = params?.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${backend}/api/events/${id}`);
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data: GetEventByIdResponse = await response.json();
        if (!data.event) throw new Error("Event not found");
        setEvent(data.event);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, backend]);

  return (
    <div className="min-h-screen bg-[#fdf6ee]">

      {/* ── header ── */}
      <header className="sticky top-0 z-10 border-b border-[#3a2a1a] bg-[#000000]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-8">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-lg transition bg-[#d14747] text-[#000000] hover:bg-[#874708]">← Back</button>
          <span className="text-xl font-bold text-[#EBE9E1]">GoPratle</span>
        </div>
      </header>

      {/* ── loading ── */}
      {loading && <Skeleton />}

      {/* ── error ── */}
      {error && (
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-5xl mb-4">⚠️</p>
          <p className="text-xl font-bold text-red-700">{error}</p>
          <button onClick={() => router.back()} className="mt-6 px-5 py-2 rounded-lg font-semibold text-white bg-[#e43d12] hover:bg-[#c4500e] transition" >Go Back</button>
        </div>
      )}

      {/* ── event detail ── */}
      {!loading && !error && event && (() => {
        const badge = getCategoryClasses(event.categorySelector);
        return (
          <main className="max-w-3xl mx-auto px-4 py-10">

            {/* hero card */}
            <div className="rounded-2xl border border-[#e2c9a8] bg-white overflow-hidden shadow-md mb-8">

              {/* top stripe */}
              <div className="h-3 w-full bg-[#e43d12]" />

              {/* dark hero area */}
              <div className="px-6 py-8 bg-[#000000]">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${badge.bg} ${badge.text}`}>{event.categorySelector}</span>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#2d1e10] text-[#fbb87a]">{event.eventType}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#fdf6ee]">{event.eventName}</h1>
              </div>

              {/* quick-info strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#e2c9a8] border-t border-[#e2c9a8] px-2">
                <div className="flex flex-col gap-0.5 px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#b48d6a]">
                    <Image src="/icons/calendar.svg" alt="date" width={13} height={13} />
                    Date
                  </span>
                  <span className="font-semibold text-sm text-[#1c1410]">
                    {formatDateLong(event.date)}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 px-5 py-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#9c7a5a]">
                    <Image src="/icons/location.svg" alt="location" width={13} height={13} />
                    Location
                  </span>
                  <span className="font-semibold text-sm text-[#1c1410]">{event.location}</span>
                </div>
                {event.venue && (
                  <div className="flex flex-col gap-0.5 px-5 py-4">
                    <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#9c7a5a]">
                      <Image src="/icons/venue.svg" alt="venue" width={13} height={13} />
                      Venue
                    </span>
                    <span className="font-semibold text-sm text-[#1c1410]">{event.venue}</span>
                  </div>
                )}
              </div>
            </div>

            {/* category-specific details card */}
            <div className="rounded-2xl border border-[#e2c9a8] bg-white overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-[#e2c9a8] bg-[#fdf6ee] flex items-center gap-2">
                <span className="w-1 h-5 rounded-full inline-block bg-[#e43d12]" />
                <h2 className="font-bold text-base text-[#000000]">
                  {event.categorySelector} Details
                </h2>
              </div>
              <div className="px-6 py-2">
                <CategoryDetails event={event} />
              </div>
            </div>
          </main>
        );
      })()}
    </div>
  );
}
