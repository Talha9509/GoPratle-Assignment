// ── sub-detail shapes ──────────────────────────────────────────────────────

export interface PlannerDetails {
  services: string[];
  foodOption: "none" | "veg" | "non-veg" | "both";
  guestCount: number;
  budget: string;
}

export interface PerformerDetails {
  genres: string[];
  interactionLevel: "no" | "medium" | "high";
  performanceDurationInHours: string;
  equipmentProvided: "yes" | "no";
  budget: string;
}

export interface CrewMember {
  role: string;
  count: number;
}

export interface CrewDetails {
  crewList: CrewMember[];
  shiftStartTime: string;
  shiftEndTime: string;
  budget: string;
}

// ── main event shape ───────────────────────────────────────────────────────

export type CategoryKey = "planner" | "performer" | "crew";

export interface Event {
  _id: string;
  eventName: string;
  eventType: string;
  startDate: string;  
  endDate: string;    
  startTime: string;
  endTime: string;
  location: string;
  venue?: string;
  instructions?: string;
  categories: CategoryKey[];
  plannerDetails?: PlannerDetails;
  performerDetails?: PerformerDetails;
  crewDetails?: CrewDetails;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllEventsResponse {
  events: Event[];
}

export interface GetEventByIdResponse {
  event: Event;
}
