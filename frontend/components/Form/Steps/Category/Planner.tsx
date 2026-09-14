import { useWatch } from "react-hook-form";

export const Planner = ({ control, register, errors }: any) => {

  // 1. Watch the array of checked services
  const rawSelectedServices = useWatch({
    control,
    name: "services",
  });

  const selectedServices = Array.isArray(rawSelectedServices) ? rawSelectedServices
    : (typeof rawSelectedServices === "string" ? [rawSelectedServices] : []);


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
    <div>

      {/* Services Required */}
      <div>
        <div>
          <label className="block font-medium mb-2">Select the services you need:</label>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="Catering" {...register("services", { required: "Please select at least one service" })} className="w-4 h-4" />
              <span>Catering</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="Decoration" {...register("services")} className="w-4 h-4" />
              <span>Decoration</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="Event Sourcing" {...register("services")} className="w-4 h-4" />
              <span>Event Sourcing</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" value="other" {...register("services")} className="w-4 h-4" />
              <span>Other (Specify)</span>
            </label>
          </div>

          {errors.services && <p className="text-red-500 text-sm">{errors.services.message as string}</p>}

          {selectedServices.includes("other") && (
            <div className="mt-3 p-3 bg-gray-50 border rounded">
              <label className="block text-sm mb-1">Please specify the custom service</label>
              <input
                type="text"
                {...register("customService", { required: "Please specify your required service" })}
                className="w-full border p-2 rounded"
                placeholder="e.g. Live Band, Valet Parking"
              />
              {errors.customService && <p className="text-red-500 text-sm mt-1">{errors.customService.message as string}</p>}
            </div>
          )}
        </div>

        {displayServices.length > 0 && (
          <div className="pt-4">
            <div className="flex flex-wrap gap-2">
              {displayServices.map((service: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">{service}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Food Preferences */}
      <div>
        <label className="block font-medium mb-1">Food Preference</label>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="none"
              {...register("foodOption", { required: "Please select a food option" })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>None</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="veg"
              {...register("foodOption")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>Veg</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="non-veg"
              {...register("foodOption")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>Non-Veg</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="both"
              {...register("foodOption")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>Both</span>
          </label>
        </div>

        {errors.foodOption && <p className="text-red-500 text-sm mt-1">{errors.foodOption.message as string}</p>}
      </div>

      {/* No. of Guests */}
      <div>
        <label>No. of Guests</label>
        <input type="number" {...register("guestCount", { required: "No. of Guests is required" })} className="w-full border p-2 rounded mt-1" />
        {errors.guestCount && <p className="text-red-500 text-sm">{errors.guestCount.message as string}</p>}
      </div>

    </div>
  )
}