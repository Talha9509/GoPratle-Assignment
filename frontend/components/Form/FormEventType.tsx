import { useWatch } from "react-hook-form";

export const FormEventType = ({ control, register, errors }: any) => {

  const [selectedEventType] = useWatch({
    control,
    name: ["eventType"],
  });

  return (
    <div>
      <div>
        <label>Event Type</label>
        <select {...register("eventType", { required: "Please select an event type" })} className="w-full border p-2 rounded mt-1" >
          <option value="">Select an option...</option>
          <option value="Conference">Conference</option>
          <option value="Wedding/Pre-wedding">Wedding/Pre-wedding</option>
          <option value="Celebration">Celebration</option>
          <option value="Concert">Concert</option>
          <option value="Workshop">Workshop</option>
          <option value="Marketing Campaign/Product Launch">Marketing Campaign/Product Launch</option>
          <option value="Meetup">Meetup</option>
          <option value="other">Other</option>
        </select>
        {errors.eventType && <p className="text-red-500 text-sm">{errors.eventType.message as string}</p>}
      </div>

      {selectedEventType === "other" && (
        <div>
          <label>Please specify your event type</label>
          <input type="text" {...register("customEventType", { required: "Please specify the event type" })} className="w-full border p-2 rounded mt-1" placeholder="e.g. Birthday Party" />
          {errors.customEventType && (<p className="text-red-500 text-sm">{errors.customEventType.message as string}</p>)}
        </div>
      )}

    </div>
  )
}
