
import mongoose, { Schema } from 'mongoose'

const baseOptions = { 
  discriminatorKey: 'categorySelector', 
  collection: 'events', 
  timestamps: true 
};

const EventBaseSchema = new Schema({
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  venue: { type: String }
}, baseOptions);

const EventBase = mongoose.models.Event || mongoose.model('Event', EventBaseSchema);

const PlannerSchema = new Schema({
  budgetRange: { type: String, required: true },
  requiredServices: [{ type: String }], // Array of strings e.g. ['Catering', 'Decor']
  guestCount: { type: Number, required: true },
  foodPreference: { type: String, enum: ['Veg', 'Non-Veg', 'Both', 'None'] },
  instructions: { type: String }
});

const PerformerSchema = new Schema({
  budgetRange: { type: String, required: true },
  genre: { type: String, required: true }, // Dance, Qawwali, Standup, etc.
  interactionLevel: { type: String },
  performanceDurationMins: { type: Number, required: true },
  equipmentProvidedByHost: { type: Boolean, required: true },
  instructions: { type: String }
});

const CrewSchema = new Schema({
  budgetRange: { type: String, required: true },
  crewType: { type: String, required: true }, // Sound, Lighting, Bouncer, etc.
  crewCount: { type: Number, required: true },
  shiftTimings: { type: String, required: true },
  instructions: { type: String }
});

const PlannerEvent = EventBase.discriminators?.['Event Planner'] || EventBase.discriminator('Event Planner', PlannerSchema);
const PerformerEvent = EventBase.discriminators?.['Performer'] || EventBase.discriminator('Performer', PerformerSchema);
const CrewEvent = EventBase.discriminators?.['Crew'] || EventBase.discriminator('Crew', CrewSchema);

export { EventBase, PlannerEvent, PerformerEvent, CrewEvent };