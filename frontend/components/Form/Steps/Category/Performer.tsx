import { useWatch } from "react-hook-form";

export const Performer = ({ control, register, errors }: any) => {
  const rawSelectedGenres = useWatch({
    control,
    name: "genres",
  });

  const selectedGenres = Array.isArray(rawSelectedGenres)
    ? rawSelectedGenres
    : typeof rawSelectedGenres === "string"
    ? [rawSelectedGenres]
    : [];

  const customGenreText = useWatch({
    control,
    name: "customGenre",
    defaultValue: "",
  });

  let displayGenres = (selectedGenres || []).filter((s: string) => s !== "other");

  if (selectedGenres?.includes("other") && customGenreText.trim() !== "") {
    const customArray = customGenreText
      .split(",")
      .map((s: string) => s.trim())
      .filter((s: string) => s !== "");

    displayGenres = [...displayGenres, ...customArray];
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-[#e2c9a8] bg-[#EBE9E1]/30 space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-[#e2c9a8]">
        <span className="w-1.5 h-4 rounded-full bg-[#e43d12]" />
        <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#fce4ec] text-[#880e4f]">
          Artist
        </span>
        <h3 className="font-bold text-sm text-[#000000]">Requirements</h3>
      </div>

      {/* Genre Type */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Select your genre <span className="text-[#e43d12]">*</span>
        </label>
        <p className="text-xs text-[#9c7a5a] mb-2.5">You can select up to 2 genres.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
          {[
            { value: "Comedy", label: "Comedy" },
            { value: "Satire", label: "Satire" },
            { value: "Drama", label: "Drama" },
            { value: "Action", label: "Action" },
            { value: "other", label: "Other (Specify)" },
          ].map((item) => {
            const isItemDisabled =
              selectedGenres.length >= 2 && !selectedGenres.includes(item.value);
            return (
              <label
                key={item.value}
                className={`flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white transition text-xs font-medium ${
                  isItemDisabled
                    ? "opacity-50 cursor-not-allowed text-gray-400 bg-gray-50"
                    : "hover:bg-[#fce4ec]/40 cursor-pointer text-[#000000]"
                }`}
              >
                <input
                  type="checkbox"
                  value={item.value}
                  {...register(
                    "genres",
                    item.value === "Comedy"
                      ? {
                          required: "Please select at least one genre",
                          validate: (val: any) =>
                            val.length <= 2 || "You can only select up to 2 genres",
                        }
                      : {}
                  )}
                  disabled={isItemDisabled}
                  className="w-4 h-4 accent-[#e43d12] cursor-pointer disabled:cursor-not-allowed"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>

        {/* Validation Error for Genres */}
        {errors.genres && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.genres.message as string}
          </p>
        )}

        {/* Custom Text Field */}
        {selectedGenres.includes("other") && (
          <div className="mt-3 p-3.5 bg-white border border-[#e2c9a8] rounded-xl space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
              Please specify the custom genre <span className="text-[#e43d12]">*</span>
            </label>
            <input
              type="text"
              {...register("customGenre", {
                required: "Please specify your required genre",
                validate: (value: string, formValues: any) => {
                  const predefinedCount = (formValues.genres || []).filter(
                    (g: string) => g !== "other"
                  ).length;
                  const customCount = value
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s !== "").length;
                  if (predefinedCount + customCount > 2) {
                    return `You can only select a total of 2 genres. You have selected ${
                      predefinedCount + customCount
                    }.`;
                  }
                  return true;
                },
              })}
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
              placeholder="e.g. Sci-Fi, Musical"
            />
            {errors.customGenre && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.customGenre.message as string}
              </p>
            )}
          </div>
        )}

        {/* Live Preview Display */}
        {displayGenres.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-[#9c7a5a] mr-1">Selected:</span>
            {displayGenres.map((genre: string, index: number) => (
              <span
                key={index}
                className="px-2.5 py-0.5 bg-[#fce4ec] text-[#880e4f] text-xs rounded-full font-medium border border-[#f8bbd0]"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Interaction Level */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-2">
          Interaction Level <span className="text-[#e43d12]">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { value: "no", label: "No Interaction" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fce4ec]/40 cursor-pointer transition text-xs font-medium text-[#000000]"
            >
              <input
                type="radio"
                value={item.value}
                {...register(
                  "interactionLevel",
                  item.value === "no" ? { required: "Please select an Interaction Level" } : {}
                )}
                className="w-4 h-4 accent-[#e43d12] cursor-pointer"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        {errors.interactionLevel && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.interactionLevel.message as string}
          </p>
        )}
      </div>

      {/* Performance Duration */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
            Performance Duration <span className="text-[#e43d12]">*</span>
          </label>
          <span className="text-[11px] text-[#9c7a5a]">(in Hours)</span>
        </div>
        <input
          {...register("performanceDuration", { required: "Performance Duration is required" })}
          placeholder="e.g. 2"
          className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
        />
        {errors.performanceDuration && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.performanceDuration.message as string}
          </p>
        )}
      </div>

      {/* Equipment Provided */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Equipment Provided <span className="text-[#e43d12]">*</span>
        </label>
        <p className="text-xs text-[#9c7a5a] mb-2">
          Specify if you will provide the equipment/instruments, or if the artist must bring their own.
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fce4ec]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="radio"
              value="no"
              {...register("equipmentProvided", { required: "Please select an option" })}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>No – artist brings own</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#e2c9a8] bg-white hover:bg-[#fce4ec]/40 cursor-pointer transition text-xs font-medium text-[#000000]">
            <input
              type="radio"
              value="yes"
              {...register("equipmentProvided")}
              className="w-4 h-4 accent-[#e43d12] cursor-pointer"
            />
            <span>Yes – provided by host</span>
          </label>
        </div>

        {errors.equipmentProvided && (
          <p className="text-red-600 text-xs mt-1.5 font-medium">
            {errors.equipmentProvided.message as string}
          </p>
        )}
      </div>
    </div>
  );
};