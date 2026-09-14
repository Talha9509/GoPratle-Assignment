import { z } from "zod";

const PlannerDetailsSchema = z.object({
  services: z.array(z.string()).min(1, "At least one service is required"),
  foodOption: z.enum(["none", "veg", "non-veg", "both"]),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1"),
  budget: z.string().min(1, "Budget is required")
});

const PerformerDetailsSchema = z.object({
  genres: z.array(z.string()).min(1, "At least one genre is required").max(2, "Maximum 2 genres allowed"),
  interactionLevel: z.enum(["no", "medium", "high"]),
  performanceDuration: z.string().min(1, "Performance duration is required"),
  equipmentProvided: z.enum(["yes", "no"]),
  budget: z.string().min(1, "Budget is required")
});

const CrewDetailsSchema = z.object({
  crewList: z.array(
    z.object({
      role: z.string(),
      count: z.coerce.number().min(1, "Count must be at least 1")
    })
  ).min(1, "At least one crew type is required"),
  shiftStartTime: z.string().min(1, "Shift start time is required"),
  shiftEndTime: z.string().min(1, "Shift end time is required"),
  budget: z.string().min(1, "Budget is required")
});



export const EventPayloadSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  eventType: z.string().min(1, "Event type is required"),
  startDate: z.coerce.date(), 
  endDate: z.coerce.date(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  location: z.string().min(1, "Location is required"),
  venue: z.string().optional(),
  instructions: z.string().optional(),
  categories: z.array(z.enum(["planner", "performer", "crew"])).min(1, "Select at least one category"),
  
  plannerDetails: PlannerDetailsSchema.optional(),
  performerDetails: PerformerDetailsSchema.optional(),
  crewDetails: CrewDetailsSchema.optional()
})
.superRefine((data, ctx) => {
  if (data.categories.includes("planner") && !data.plannerDetails) {
    ctx.addIssue({ code: "custom", message: "Planner details are missing", path: ["plannerDetails"] });
  }
  if (data.categories.includes("performer") && !data.performerDetails) {
    ctx.addIssue({ code: "custom", message: "Performer details are missing", path: ["performerDetails"] });
  }
  if (data.categories.includes("crew") && !data.crewDetails) {
    ctx.addIssue({ code: "custom", message: "Crew details are missing", path: ["crewDetails"] });
  }
});

export type EventPayload = z.infer<typeof EventPayloadSchema>;