"use client";
import {
  Event,
  PlannerDetails,
  PerformerDetails,
  CrewDetails,
  GetEventByIdResponse,
} from "@/types/event";
import { formatDateLong, formatDateTime, formatDateRange, formatTime } from "@/utils/formatDate";
import { getCategoryClasses, getCategoryLabel } from "@/utils/categoryBadge";

// ── detail row ─────────────────────────────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-3 border-b border-[#e2c9a8] last:border-0">
      <span className="text-xs font-semibold uppercase tracking-widest w-48 shrink-0 pt-0.5 text-[#9c7a5a]">
        {label}
      </span>
      <span className="font-medium text-[#000000]">{value}</span>
    </div>
  );
}

// ── tag pill ───────────────────────────────────────────────────────────────

function Tag({ label, className }: { label: string; className?: string }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
      {label}
    </span>
  );
}

// ── planner details section ────────────────────────────────────────────────

function PlannerSection({ details }: { details: PlannerDetails }) {
  const foodLabels: Record<string, string> = {
    none: "None",
    veg: "Vegetarian",
    "non-veg": "Non-Vegetarian",
    both: "Both (Veg & Non-Veg)",
  };

  return (
    <div>
      <DetailRow label="Budget" value={details.budget} />
      <DetailRow label="Guest Count" value={details.guestCount.toLocaleString()} />
      <DetailRow label="Food Option" value={foodLabels[details.foodOption] ?? details.foodOption} />
      {details.services.length > 0 && (
        <DetailRow
          label="Required Services"
          value={
            <div className="flex flex-wrap gap-2">
              {details.services.map((s) => (
                <Tag key={s} label={s} className="bg-[#fff3e0] text-[#e65100]" />
              ))}
            </div>
          }
        />
      )}
    </div>
  );
}

// ── performer details section ──────────────────────────────────────────────

function PerformerSection({ details }: { details: PerformerDetails }) {
  const interactionLabels: Record<string, string> = {
    no: "No Interaction",
    medium: "Medium",
    high: "High",
  };

  return (
    <div>
      <DetailRow label="Budget" value={details.budget} />
      {details.genres.length > 0 && (
        <DetailRow
          label="Genres"
          value={
            <div className="flex flex-wrap gap-2">
              {details.genres.map((g) => (
                <Tag key={g} label={g} className="bg-[#fce4ec] text-[#880e4f]" />
              ))}
            </div>
          }
        />
      )}
      <DetailRow
        label="Performance Duration"
        value={`${details.performanceDurationInHours} hrs`}
      />
      <DetailRow
        label="Equipment Provided"
        value={
          <Tag
            label={details.equipmentProvided === "yes" ? "Yes – by host" : "No – bring your own"}
            className={
              details.equipmentProvided === "yes"
                ? "bg-[#e8f5e9] text-[#1b5e20]"
                : "bg-[#fce4ec] text-[#880e4f]"
            }
          />
        }
      />
      <DetailRow
        label="Interaction Level"
        value={interactionLabels[details.interactionLevel] ?? details.interactionLevel}
      />
    </div>
  );
}

// ── crew details section ───────────────────────────────────────────────────

function CrewSection({ details }: { details: CrewDetails }) {
  return (
    <div>
      <DetailRow label="Budget" value={details.budget} />
      <DetailRow
        label="Shift Timings"
        value={`${formatTime(details.shiftStartTime)} – ${formatTime(details.shiftEndTime)}`}
      />
      {details.crewList.length > 0 && (
        <DetailRow
          label="Crew List"
          value={
            <div className="flex flex-col gap-2 w-full">
              {details.crewList.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-[#e2c9a8] bg-[#EBE9E1] px-3 py-2 text-sm"
                >
                  <span className="font-semibold text-[#000000]">{member.role}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#e8f5e9] text-[#1b5e20]">
                    × {member.count}
                  </span>
                </div>
              ))}
            </div>
          }
        />
      )}
    </div>
  );
}

// ── section wrapper card ───────────────────────────────────────────────────

function SectionCard({
  category,
  children,
}: {
  category: string;
  children: React.ReactNode;
}) {
  const badge = getCategoryClasses(category);
  return (
    <div className="rounded-2xl border border-[#e2c9a8] bg-white overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-[#e2c9a8] bg-[#EBE9E1] flex items-center gap-2">
        <span className="w-1 h-5 rounded-full inline-block bg-[#e43d12]" />
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${badge.bg} ${badge.text}`}
        >
          {getCategoryLabel(category)}
        </span>
        <h2 className="font-bold text-base text-[#000000]">Details</h2>
      </div>
      <div className="px-6 py-2">{children}</div>
    </div>
  );
}

export { SectionCard, CrewSection, PlannerSection, PerformerSection }