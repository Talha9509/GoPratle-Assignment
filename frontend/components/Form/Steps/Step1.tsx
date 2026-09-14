import { FormEventType } from "../FormEventType";
import { DateRange } from "../DateRange";

export const Step1 = ({ control, register, errors }: any) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#e2c9a8] pb-3">
        <h2 className="text-lg font-bold text-[#000000]">Basic Information</h2>
        <p className="text-xs text-[#6b4f35] mt-0.5">Enter key details about your upcoming event.</p>
      </div>

      {/* Event Name */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Name of Event <span className="text-[#e43d12]">*</span>
        </label>
        <input
          {...register("eventName", { required: "Event name is required" })}
          placeholder="e.g. Annual Tech Symposium 2026"
          className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
        />
        {errors.eventName && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.eventName.message as string}
          </p>
        )}
      </div>

      <DateRange control={control} register={register} errors={errors} />
      <FormEventType control={control} register={register} errors={errors} />

      {/* Location & Venue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
            Location <span className="text-[#e43d12]">*</span>
          </label>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="e.g. New Delhi, India"
            className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
          />
          {errors.location && (
            <p className="text-red-600 text-xs mt-1.5 font-medium">
              {errors.location.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
            Venue <span className="text-xs font-normal text-[#9c7a5a] lowercase">(optional)</span>
          </label>
          <input
            {...register("venue")}
            placeholder="e.g. Grand Ballroom, Hyatt"
            className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
          />
        </div>
      </div>

      {/* Event Timings */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Event Timings <span className="text-[#e43d12]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1.5">
          {/* FROM TIME */}
          <div>
            <label className="block text-xs text-[#9c7a5a] mb-1">Start Time</label>
            <input
              type="time"
              defaultValue="00:00"
              {...register("startTime", {
                required: "Start time is required",
              })}
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
            />
            {errors.startTime && (
              <p className="text-red-600 text-xs mt-1.5 font-medium">
                {errors.startTime.message as string}
              </p>
            )}
          </div>

          {/* TO TIME */}
          <div>
            <label className="block text-xs text-[#9c7a5a] mb-1">End Time</label>
            <input
              type="time"
              defaultValue="00:00"
              {...register("endTime", {
                required: "End time is required",
                validate: (value: any, formValues: any) => {
                  if (!formValues.startTime) return true;
                  return value > formValues.startTime || "End time must be after start time";
                },
              })}
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
            />
            {errors.endTime && (
              <p className="text-red-600 text-xs mt-1.5 font-medium">
                {errors.endTime.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Event Professionals Needed <span className="text-[#e43d12]">*</span>
        </label>
        <p className="text-xs text-[#9c7a5a] mb-3">
          Select at least one role you are hiring for (you can choose multiple).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#e2c9a8] bg-[#fff3e0]/40 hover:bg-[#fff3e0] cursor-pointer transition">
            <input
              type="checkbox"
              value="planner"
              {...register("category", { required: "Please select at least one role" })}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <div>
              <span className="text-sm font-semibold text-[#000000] block">Event Planner</span>
              <span className="text-[11px] text-[#6b4f35]">Planning & Catering</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#e2c9a8] bg-[#fce4ec]/40 hover:bg-[#fce4ec] cursor-pointer transition">
            <input
              type="checkbox"
              value="performer"
              {...register("category")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <div>
              <span className="text-sm font-semibold text-[#000000] block">Performer</span>
              <span className="text-[11px] text-[#6b4f35]">Artists & Musicians</span>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3.5 rounded-xl border border-[#e2c9a8] bg-[#e8f5e9]/40 hover:bg-[#e8f5e9] cursor-pointer transition">
            <input
              type="checkbox"
              value="crew"
              {...register("category")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <div>
              <span className="text-sm font-semibold text-[#000000] block">Crew</span>
              <span className="text-[11px] text-[#6b4f35]">Security, Photo, etc.</span>
            </div>
          </label>
        </div>

        {errors.category && (
          <p className="text-red-600 text-xs mt-2 font-medium">
            {errors.category.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
