
import mongoose, { Schema } from 'mongoose';

const EventSchema = new Schema({
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  venue: { type: String },
  instructions: { type: String },
  
  categories: [{ type: String, enum: ['planner', 'performer', 'crew'] }],
  
  plannerDetails: {
    services: [{ type: String }],
    foodOption: { type: String },
    guestCount: { type: Number },
    budget: { type: String }
  },

  performerDetails: {
    genres: [{ type: String }],
    interactionLevel: { type: String },
    performanceDuration: { type: String },
    equipmentProvided: { type: String },
    budget: { type: String }
  },

  crewDetails: {
    crewList: [{
      role: { type: String },
      count: { type: Number }
    }],
    shiftStartTime: { type: String },
    shiftEndTime: { type: String },
    budget: { type: String }
  }
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);
export default Event;
