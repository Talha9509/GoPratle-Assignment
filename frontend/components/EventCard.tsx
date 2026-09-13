"use client"
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types/event";
import { formatDate } from "@/utils/formatDate";
import { getCategoryClasses } from "@/utils/categoryBadge";

export default function EventCard({ event }: { event: Event }) {
  const badge = getCategoryClasses(event.categorySelector);

  return (
    <Link href={`/event/${event._id}`} className="block group">
      <div className="rounded-2xl border border-[#e2c9a8] bg-white overflow-hidden shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">

        {/* coloured top strip */}
        <div className="h-2 w-full bg-[#e43d12]" />

        <div className="p-5 flex flex-col gap-3">
          {/* category badge + event type */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${badge.bg} ${badge.text}`}
            >
              {event.categorySelector}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#f5e6d3] text-[#6b4f35]">
              {event.eventType}
            </span>
          </div>

          {/* title */}
          <h2 className="text-lg font-bold leading-tight text-[#1c1410]">
            {event.eventName}
          </h2>

          {/* meta */}
          <div className="flex flex-col gap-1.5 text-sm text-[#6b4f35]">
            <div className="flex items-center gap-1.5">
              <Image src="/icons/calendar.svg" alt="date" width={14} height={14} className="shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Image src="/icons/location.svg" alt="location" width={14} height={14} className="shrink-0" />
              <span>{event.location}</span>
            </div>
            {event.venue && (
              <div className="flex items-center gap-1.5">
                <Image src="/icons/venue.svg" alt="venue" width={14} height={14} className="shrink-0" />
                <span>{event.venue}</span>
              </div>
            )}
          </div>

          {/* cta */}
          <div className="mt-1 flex justify-end">
            <span className="text-sm font-semibold text-[#e43d12]">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}