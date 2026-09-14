import { Controller, useWatch } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import calculateTotalDays from "../../utils/calculateTotalDays";

export const DateRange = ({ control, errors }: any) => {
  const selectedDateRange = useWatch({
    control,
    name: "dateRange",
  });

  const totalDays = calculateTotalDays(selectedDateRange);

  return (
    <div>
      {/* --- CALENDAR INTEGRATION --- */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Dates of Event <span className="text-[#e43d12]">*</span>
        </label>
        <p className="text-xs text-[#9c7a5a] mb-2">Select the start and end dates for your event.</p>

        <div className="border border-[#e2c9a8] rounded-2xl p-4 bg-[#EBE9E1]/30 inline-block overflow-x-auto max-w-full">
          <Controller
            control={control}
            name="dateRange"
            rules={{ required: "Please select your event dates" }}
            render={({ field }) => (
              <DayPicker
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                className="my-0"
                disabled={{ before: new Date() }}
              />
            )}
          />
        </div>

        {errors.dateRange && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.dateRange.message as string}
          </p>
        )}

        {/* Dynamic Helper UI showing the calculated days */}
        {totalDays > 0 && selectedDateRange?.from && (
          <div className="mt-3 p-3.5 bg-[#fff3e0] text-[#e65100] rounded-xl border border-[#fed7aa] flex items-center gap-2.5 text-sm font-medium">
            <div>
              <span>
                <strong>Duration:</strong> {totalDays} {totalDays === 1 ? "day" : "days"} selected
              </span>
              <span className="text-xs text-[#c4500e] block mt-0.5">
                ({format(selectedDateRange.from, "MMM dd, yyyy")}
                {selectedDateRange.to && ` - ${format(selectedDateRange.to, "MMM dd, yyyy")}`})
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};