import { useWatch } from "react-hook-form";

export const FormEventType = ({ control, register, errors }: any) => {
  const [selectedEventType] = useWatch({
    control,
    name: ["eventType"],
  });

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Event Type <span className="text-[#e43d12]">*</span>
        </label>
        <select
          {...register("eventType", { required: "Please select an event type" })}
          className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
        >
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
        {errors.eventType && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.eventType.message as string}
          </p>
        )}
      </div>

      {selectedEventType === "other" && (
        <div className="p-3.5 bg-[#EBE9E1] border border-[#e2c9a8] rounded-xl space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
            Please specify your event type <span className="text-[#e43d12]">*</span>
          </label>
          <input
            type="text"
            {...register("customEventType", { required: "Please specify the event type" })}
            className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
            placeholder="e.g. Birthday Party"
          />
          {errors.customEventType && (
            <p className="text-red-600 text-xs mt-1 font-medium">
              {errors.customEventType.message as string}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
