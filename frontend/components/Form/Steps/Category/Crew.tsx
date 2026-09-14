import { useWatch } from "react-hook-form";

export const Crew = ({ control, register, errors }: any) => {

  const rawSelectedCrewType = useWatch({
    control,
    name: "crewtype",
  });

  const selectedCrewType = Array.isArray(rawSelectedCrewType) ? rawSelectedCrewType
    : (typeof rawSelectedCrewType === "string" ? [rawSelectedCrewType] : []);

  const customCrewTypeText = useWatch({
    control,
    name: "customCrewType",
    defaultValue: "",
  });

  let displayCrewType = (selectedCrewType || []).filter((s: string) => s !== "other");

  if (selectedCrewType?.includes("other") && customCrewTypeText.trim() !== "") {
    const customArray = customCrewTypeText
      .split(",")
      .map((s: string) => s.trim())
      .filter((s: string) => s !== "");

    displayCrewType = [...displayCrewType, ...customArray];
  }

  return (
    <div>

      {/* Crew Type */}
      <div>
        <div>
          <label className="block font-medium mb-2">Select the Crew Type you need:</label>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="Security" {...register("crewtype", { required: "Please select at least one service" })} className="w-4 h-4" />
              <span>Security</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="Makeup" {...register("crewtype")} className="w-4 h-4" />
              <span>Makeup</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="Photography" {...register("crewtype")} className="w-4 h-4" />
              <span>Photography</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="other" {...register("crewtype")} className="w-4 h-4" />
              <span>Other (Specify)</span>
            </label>
          </div>
          {errors.crewtype && <p className="text-red-500 text-sm">{errors.crewtype.message as string}</p>}

          {/* Crew Type Mapping */}
          {selectedCrewType.includes("other") && (
            <div className="mt-3 p-3 bg-gray-50 border rounded">
              <label className="block text-sm mb-1">Please specify the custom service</label>
              <input
                type="text"
                {...register("customCrewType", { required: "Please specify your required service" })}
                className="w-full border p-2 rounded"
                placeholder="e.g. Live Band, Valet Parking"
              />
              {errors.customCrewType && <p className="text-red-500 text-sm mt-1">{errors.customCrewType.message as string}</p>}
            </div>
          )}
        </div>

        {/* No. of crew required */}
        {displayCrewType.length > 0 && (
          <div className="pt-4">
            <div className="flex flex-wrap gap-2">
              {displayCrewType.map((service: string, index: number) => (
                <div key={index}>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">{service}</span>
                  <label>No. of Crew required for {service}</label>
                  <input type="number" {...register(`crewCount_${service}`, { required: "No. of crews is required" })} className="w-full border p-2 rounded mt-1" />
                  {errors.customCrewType && <p className="text-red-500 text-sm">{errors.customCrewType.message as string}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Shift Timings */}
      <div>
        <label className="block font-medium mb-1">Crew Shift Timings</label>

        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* FROM TIME */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">From</label>
            <input
              type="time"
              defaultValue="00:00"
              {...register("crewStartTime", {
                required: "Start time is required"
              })}
              className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.crewStartTime && (
              <p className="text-red-500 text-sm mt-1">{errors.crewStartTime.message as string}</p>
            )}
          </div>

          {/* TO TIME */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">To</label>
            <input
              type="time"
              defaultValue="00:00"
              {...register("crewEndTime", {
                required: "End time is required",
                validate: (value: any, formValues: any) => {
                  if (!formValues.crewStartTime) return true; 
                  return value > formValues.crewStartTime || "End time must be after start time";
                }
              })}
              className="w-full border p-2 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.crewEndTime && (
              <p className="text-red-500 text-sm mt-1">{errors.crewEndTime.message as string}</p>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}