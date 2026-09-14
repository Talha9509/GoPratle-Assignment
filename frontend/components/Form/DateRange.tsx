
import { Controller, useWatch } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import calculateTotalDays from '../../utils/calculateTotalDays'

export const DateRange = ({ control, register, errors }: any) => {

  const selectedDateRange = useWatch({
    control,
    name: "dateRange",
  });

  const totalDays = calculateTotalDays(selectedDateRange);

  return (
    <div>
      {/* --- CALENDAR INTEGRATION --- */}
      <div>
        <label className="block font-medium mb-1">Dates of Event</label>
        <p className="text-sm text-gray-500 mb-2">Select a start and end date.</p>

        <div className="border rounded p-4 bg-white inline-block">
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

        {errors.dateRange && <p className="text-red-500 text-sm mt-1">{errors.dateRange.message as string}</p>}

        {/* Dynamic Helper UI showing the calculated days */}
        {totalDays > 0 && (
          <div className="mt-3 p-3 bg-blue-50 text-blue-700 rounded border border-blue-100">
            <strong>Duration:</strong> {totalDays} {totalDays === 1 ? "day" : "days"} selected.
            <br />
            <span className="text-sm">
              ({format(selectedDateRange.from, "MMM dd, yyyy")}
              {selectedDateRange.to && ` - ${format(selectedDateRange.to, "MMM dd, yyyy")}`})
            </span>
          </div>
        )}
      </div>
    </div>
  )
}