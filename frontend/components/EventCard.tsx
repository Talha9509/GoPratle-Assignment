"use client";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types/event";
import { formatDateRange, formatTime } from "@/utils/formatDate";
import { getCategoryClasses, getCategoryLabel } from "@/utils/categoryBadge";

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/event/${event._id}`} className="block group">
      <div className="rounded-2xl border border-[#e2c9a8] bg-white overflow-hidden shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">

        {/* coloured top strip */}
        <div className="h-2 w-full bg-[#e43d12]" />

        <div className="p-5 flex flex-col gap-3">

          {/* category badges */}
          <div className="flex flex-wrap gap-1.5">
            {event.categories.map((cat) => {
              const badge = getCategoryClasses(cat);
              return (
                <span
                  key={cat}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide ${badge.bg} ${badge.text}`}
                >
                  {getCategoryLabel(cat)}
                </span>
              );
            })}
          </div>

          {/* title */}
          <h2 className="text-lg font-bold leading-tight text-[#000000]">
            {event.eventName}
          </h2>

          {/* event type pill */}
          <span className="self-start text-xs font-medium px-2 py-0.5 rounded bg-[#f5e6d3] text-[#6b4f35]">
            {event.eventType}
          </span>

          {/* meta */}
          <div className="flex flex-col gap-1.5 text-sm text-[#6b4f35]">
            {/* date range */}
            <div className="flex items-center gap-1.5">
              <Image src="/icons/calendar.svg" alt="date" width={14} height={14} className="shrink-0" />
              <span>{formatDateRange(event.startDate, event.endDate)}</span>
            </div>
            {/* time */}
            <div className="flex items-center gap-1.5">
              <Image src="/icons/clock.svg" alt="time" width={14} height={14} className="shrink-0" />
              <span>{formatTime(event.startTime)} – {formatTime(event.endTime)}</span>
            </div>
            {/* location */}
            <div className="flex items-center gap-1.5">
              <Image src="/icons/location.svg" alt="location" width={14} height={14} className="shrink-0" />
              <span>{event.location}</span>
            </div>
            {/* venue (optional) */}
            {event.venue && (
              <div className="flex items-center gap-1.5">
                <Image src="/icons/venue.svg" alt="venue" width={14} height={14} className="shrink-0" />
                <span>{event.venue}</span>
              </div>
            )}
          </div>

          {/* cta */}
          <div className="mt-1 flex justify-end">
            <span className="text-sm font-semibold text-[#e43d12]">View Details →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}