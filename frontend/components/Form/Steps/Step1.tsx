
import { FormEventType } from '../FormEventType'
import { DateRange } from '../DateRange';

export const Step1 = ({ control, register, errors }: any) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Personal Info</h2>
      <div>
        <label>Name of Event</label>
        <input {...register("eventName", { required: "Event name is required" })} className="w-full border p-2 rounded mt-1" />
        {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName.message as string}</p>}
      </div>

      <DateRange control={control} register={register} errors={errors} />
      <FormEventType control={control} register={register} errors={errors} />

      <div>
        <label>Location</label>
        <input {...register("location", { required: "Location is required" })} className="w-full border p-2 rounded mt-1" />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message as string}</p>}
      </div>

      <div>
        <label>Venue</label>
        <input {...register("venue")} className="w-full border p-2 rounded mt-1" />
      </div>

      <div>
        <label className="block font-medium mb-1">Event Timings</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* FROM TIME */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">From</label>
            <input
              type="time"
              defaultValue="00:00"
              {...register("startTime", { 
                required: "Start time is required" 
              })}
              className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">{errors.startTime.message as string}</p>
            )}
          </div>

          {/* TO TIME */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">To</label>
            <input
              type="time"
              defaultValue="00:00"
              {...register("endTime", { 
                required: "End time is required",
                validate: (value: any, formValues: any) => {
                  if (!formValues.startTime) return true;
                  return value > formValues.startTime || "End time must be after start time";
                }
              })}
              className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm mt-1">{errors.endTime.message as string}</p>
            )}
          </div>
        </div>
      </div>



      <div>
        <label className="block font-medium mb-1">Event Professionals</label>
        <p className="text-sm text-gray-500 mb-2">Select at least one (you can choose multiple).</p>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" value="planner" {...register("category", { required: "Please select at least one role" })} className="w-4 h-4" />
            <span>Event Manager</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" value="performer" {...register("category")} className="w-4 h-4" />
            <span>Artist</span>
          </label>

          <label className="flex items-center space-x-2">
            <input type="checkbox" value="crew" {...register("category")} className="w-4 h-4" />
            <span>Crew</span>
          </label>
        </div>

        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message as string}</p>}
      </div>

    </div>
  )
}
