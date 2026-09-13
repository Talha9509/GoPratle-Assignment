// Base event fields shared by all event types
export interface EventBase {
  _id: string;
  eventName: string;
  eventType: string;
  date: string; // ISO date string from MongoDB
  location: string;
  venue?: string;
  categorySelector: "Event Planner" | "Performer" | "Crew";
  createdAt: string;
  updatedAt: string;
}

// Planner-specific fields
export interface PlannerEvent extends EventBase {
  categorySelector: "Event Planner";
  budgetRange: string;
  requiredServices: string[];
  guestCount: number;
  foodPreference?: "Veg" | "Non-Veg" | "Both" | "None";
  instructions?: string;
}

// Performer-specific fields
export interface PerformerEvent extends EventBase {
  categorySelector: "Performer";
  budgetRange: string;
  genre: string;
  interactionLevel?: string;
  performanceDurationMins: number;
  equipmentProvidedByHost: boolean;
  instructions?: string;
}

// Crew-specific fields
export interface CrewEvent extends EventBase {
  categorySelector: "Crew";
  budgetRange: string;
  crewType: string;
  crewCount: number;
  shiftTimings: string;
  instructions?: string;
}

// Union type for any event
export type Event = PlannerEvent | PerformerEvent | CrewEvent;

// API response shapes
export interface GetAllEventsResponse {
  events: Event[];
}

export interface GetEventByIdResponse {
  event: Event;
}

