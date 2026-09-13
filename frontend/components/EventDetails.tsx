"use client";
import { Event, PlannerEvent, PerformerEvent, CrewEvent } from "@/types/event";
import { formatDateTime } from "@/utils/formatDate";

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 py-3 border-b border-[#e2c9a8] last:border-0">
      <span className="text-xs font-semibold uppercase tracking-widest w-44 shrink-0 pt-0.5 text-[#9c7a5a]">
        {label}
      </span>
      <span className="font-medium text-[#1c1410]">{value}</span>
    </div>
  );
}

function PlannerDetails({ event }: { event: PlannerEvent }) {
  return (
    <div>
      <DetailRow label="Posted" value={formatDateTime(event.createdAt)} />
      <DetailRow label="Budget Range" value={event.budgetRange} />
      <DetailRow label="Guest Count" value={event.guestCount.toLocaleString()} />
      {event.foodPreference && (
        <DetailRow label="Food Preference" value={event.foodPreference == 'Both' ? 'Veg & Non-veg' : event.foodPreference} />
      )}
      {event.requiredServices.length > 0 && (
        <DetailRow
          label="Required Services"
          value={
            <div className="flex flex-wrap gap-2">
              {event.requiredServices.map((s) => (
                <span key={s} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#fff3e0] text-[#e65100]">
                  {s}
                </span>
              ))}
            </div>
          }
        />
      )}
      {event.instructions && (
        <DetailRow
          label="Instructions"
          value={
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#6b4f35]">
              {event.instructions}
            </p>
          }
        />
      )}
      
    </div>
  );
}

function PerformerDetails({ event }: { event: PerformerEvent }) {
  return (
    <div>
      <DetailRow label="Budget Range" value={event.budgetRange} />
      <DetailRow label="Genre" value={event.genre} />
      <DetailRow label="Performance Duration" value={`${event.performanceDurationMins} mins`} />
      <DetailRow
        label="Equipment by Host"
        value={
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              event.equipmentProvidedByHost
                ? "bg-[#e8f5e9] text-[#1b5e20]"
                : "bg-[#fce4ec] text-[#880e4f]"
            }`}
          >
            {event.equipmentProvidedByHost ? "Yes" : "No"}
          </span>
        }
      />
      {event.interactionLevel && (
        <DetailRow label="Interaction Level" value={event.interactionLevel} />
      )}
      {event.instructions && (
        <DetailRow
          label="Instructions"
          value={
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#6b4f35]">
              {event.instructions}
            </p>
          }
        />
      )}
    </div>
  );
}

function CrewDetails({ event }: { event: CrewEvent }) {
  return (
    <div>
      <DetailRow label="Budget Range" value={event.budgetRange} />
      <DetailRow label="Crew Type" value={event.crewType} />
      <DetailRow label="Crew Count" value={event.crewCount.toLocaleString()} />
      <DetailRow label="Shift Timings" value={event.shiftTimings} />
      {event.instructions && (
        <DetailRow
          label="Instructions"
          value={
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#6b4f35]">
              {event.instructions}
            </p>
          }
        />
      )}
    </div>
  );
}

function CategoryDetails({ event }: { event: Event }) {
  switch (event.categorySelector) {
    case "Event Planner":
      return <PlannerDetails event={event as PlannerEvent} />;
    case "Performer":
      return <PerformerDetails event={event as PerformerEvent} />;
    case "Crew":
      return <CrewDetails event={event as CrewEvent} />;
  }
}


export { CategoryDetails }