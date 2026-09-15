import { useWatch } from "react-hook-form";

export const Planner = ({ register, control, errors }: any) => {
  // 1. Watch the array of checked services
  const rawSelectedServices = useWatch({
    control,
    name: "services",
  });

  const selectedServices = Array.isArray(rawSelectedServices)
    ? rawSelectedServices
    : typeof rawSelectedServices === "string"
    ? [rawSelectedServices]
    : [];

  const customServiceText = useWatch({
    control,
    name: "customService",
    defaultValue: "",
  });

  let displayServices = (selectedServices || []).filter((s: string) => s !== "other");

  if (selectedServices?.includes("other") && customServiceText.trim() !== "") {
    const customArray = customServiceText
      .split(",")
      .map((s: string) => s.trim())
      .filter((s: string) => s !== "");

    displayServices = [...displayServices, ...customArray];
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-[#e2c9a8] bg-[#EBE9E1]/30 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-[#e2c9a8]">
        <span className="w-1.5 h-4 rounded-full bg-[#e43d12]" />
        <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#fff3e0] text-[#e65100]">
          Event Planner
        </span>
        <h3 className="font-bold text-sm text-[#000000]">Requirements</h3>
      </div>

      {/* Services Required */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-2">
          Select the services you need <span className="text-[#e43d12]">*</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fff3e0]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="checkbox"
              value="Catering"
              {...register("services", { required: "Please select at least one service" })}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>Catering</span>
          </label>
          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fff3e0]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="checkbox"
              value="Decoration"
              {...register("services")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>Decoration</span>
          </label>
          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fff3e0]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="checkbox"
              value="Event Sourcing"
              {...register("services")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>Event Sourcing</span>
          </label>
          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fff3e0]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="checkbox"
              value="other"
              {...register("services")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>Other (Specify)</span>
          </label>
        </div>

        {errors.services && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.services.message as string}
          </p>
        )}

        {selectedServices.includes("other") && (
          <div className="mt-3 p-3.5 bg-white border border-[#e2c9a8] rounded-xl space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
              Please specify the custom service <span className="text-[#e43d12]">*</span>
            </label>
            <input
              type="text"
              {...register("customService", { required: "Please specify your required service" })}
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
              placeholder="e.g. Live Band, Valet Parking"
            />
            {errors.customService && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.customService.message as string}
              </p>
            )}
          </div>
        )}

        {displayServices.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#9c7a5a] mr-1">Selected:</span>
            {displayServices.map((service: string, index: number) => (
              <span
                key={index}
                className="px-2.5 py-0.5 bg-[#fff3e0] text-[#e65100] text-xs rounded-full font-medium border border-[#fed7aa]"
              >
                {service}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Food Preferences */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-2">
          Food Preference <span className="text-[#e43d12]">*</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fff3e0]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="radio"
              value="none"
              {...register("foodOption", { required: "Please select a food option" })}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>None</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fff3e0]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="radio"
              value="veg"
              {...register("foodOption")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>Veg</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fff3e0]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="radio"
              value="non-veg"
              {...register("foodOption")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>Non-Veg</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fff3e0]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="radio"
              value="both"
              {...register("foodOption")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>Both</span>
          </label>
        </div>

        {errors.foodOption && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.foodOption.message as string}
          </p>
        )}
      </div>

      {/* No. of Guests */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          No. of Guests <span className="text-[#e43d12]">*</span>
        </label>
        <input
          type="number"
          {...register("guestCount", { required: "No. of Guests is required" })}
          placeholder="e.g. 150"
          className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
        />
        {errors.guestCount && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.guestCount.message as string}
          </p>
        )}
      </div>
    </div>
  );
};