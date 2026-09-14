import { useWatch } from "react-hook-form";

export const Crew = ({ control, register, errors }: any) => {
  const rawSelectedCrewType = useWatch({
    control,
    name: "crewtype",
  });

  const selectedCrewType = Array.isArray(rawSelectedCrewType)
    ? rawSelectedCrewType
    : typeof rawSelectedCrewType === "string"
    ? [rawSelectedCrewType]
    : [];

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
    <div className="p-5 sm:p-6 rounded-2xl border border-[#e2c9a8] bg-[#EBE9E1]/30 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-[#e2c9a8]">
        <span className="w-1.5 h-4 rounded-full bg-[#e43d12]" />
        <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#e8f5e9] text-[#1b5e20]">
          Crew
        </span>
        <h3 className="font-bold text-sm text-[#000000]">Requirements</h3>
      </div>

      {/* Crew Type */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-2">
          Select the Crew Type you need <span className="text-[#e43d12]">*</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
          {[
            { value: "Security", label: "Security" },
            { value: "Makeup", label: "Makeup" },
            { value: "Photography", label: "Photography" },
            { value: "other", label: "Other (Specify)" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#e8f5e9]/40 cursor-pointer transition text-xs font-medium text-[#000000]"
            >
              <input
                type="checkbox"
                value={item.value}
                {...register(
                  "crewtype",
                  item.value === "Security" ? { required: "Please select at least one service" } : {}
                )}
                className="w-4 h-4 accent-[#e43d12] cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        {errors.crewtype && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.crewtype.message as string}
          </p>
        )}

        {/* Custom Crew Type */}
        {selectedCrewType.includes("other") && (
          <div className="mt-3 p-3.5 bg-white border border-[#e2c9a8] rounded-xl space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
              Please specify the custom crew type <span className="text-[#e43d12]">*</span>
            </label>
            <input
              type="text"
              {...register("customCrewType", { required: "Please specify your required service" })}
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
              placeholder="e.g. Sound Engineer, Lighting Tech"
            />
            {errors.customCrewType && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.customCrewType.message as string}
              </p>
            )}
          </div>
        )}

        {/* No. of crew required per role */}
        {displayCrewType.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#e2c9a8] space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
              Quantity Required per Crew Role <span className="text-[#e43d12]">*</span>
            </label>
            <div className="space-y-2.5">
              {displayCrewType.map((service: string, index: number) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-[#e2c9a8] bg-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#e8f5e9] text-[#1b5e20] text-xs rounded-full font-semibold border border-[#c8e6c9]">
                      {service}
                    </span>
                    <span className="text-xs text-[#6b4f35]">Number of staff needed:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Count (e.g. 2)"
                      {...register(`crewCount_${service}`, { required: "No. of crews is required" })}
                      className="w-full sm:w-28 border border-[#e2c9a8] p-1.5 px-3 rounded-lg bg-[#EBE9E1]/40 text-[#000000] text-sm focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12]"
                    />
                  </div>
                </div>
              ))}
            </div>
            {errors.customCrewType && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.customCrewType.message as string}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Shift Timings */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Crew Shift Timings <span className="text-[#e43d12]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1.5">
          {/* FROM TIME */}
          <div>
            <label className="block text-xs text-[#9c7a5a] mb-1">Shift Start</label>
            <input
              type="time"
              defaultValue="00:00"
              {...register("crewStartTime", {
                required: "Start time is required",
              })}
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
            />
            {errors.crewStartTime && (
              <p className="text-red-600 text-xs mt-1.5 font-medium">
                {errors.crewStartTime.message as string}
              </p>
            )}
          </div>

          {/* TO TIME */}
          <div>
            <label className="block text-xs text-[#9c7a5a] mb-1">Shift End</label>
            <input
              type="time"
              defaultValue="00:00"
              {...register("crewEndTime", {
                required: "End time is required",
                validate: (value: any, formValues: any) => {
                  if (!formValues.crewStartTime) return true;
                  return value > formValues.crewStartTime || "End time must be after start time";
                },
              })}
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
            />
            {errors.crewEndTime && (
              <p className="text-red-600 text-xs mt-1.5 font-medium">
                {errors.crewEndTime.message as string}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};