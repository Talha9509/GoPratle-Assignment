import { useWatch } from "react-hook-form";

export const Performer = ({ control, register, errors }: any) => {

  const rawSelectedGenres = useWatch({
    control,
    name: "genres",
  });

  const selectedGenres = Array.isArray(rawSelectedGenres) ? rawSelectedGenres
    : (typeof rawSelectedGenres === "string" ? [rawSelectedGenres] : []);

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
    <div>

      {/* Genre Type */}
      <div>
        <label className="block font-medium mb-1">Select your genre:</label>
        <p className="text-sm text-gray-500 mb-2">You can select up to 2 genres.</p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Comedy"
              {...register("genres", {
                required: "Please select at least one genre",
                validate: (val: any) => val.length <= 2 || "You can only select up to 2 genres"
              })}
              disabled={selectedGenres.length >= 2 && !selectedGenres.includes("Comedy")}
              className="w-4 h-4 disabled:opacity-50"
            />
            <span className={selectedGenres.length >= 2 && !selectedGenres.includes("Comedy") ? "text-gray-400" : ""}>Comedy</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Satire"
              {...register("genres")}
              disabled={selectedGenres.length >= 2 && !selectedGenres.includes("Satire")}
              className="w-4 h-4 disabled:opacity-50"
            />
            <span className={selectedGenres.length >= 2 && !selectedGenres.includes("Satire") ? "text-gray-400" : ""}>Satire</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Drama"
              {...register("genres")}
              disabled={selectedGenres.length >= 2 && !selectedGenres.includes("Drama")}
              className="w-4 h-4 disabled:opacity-50"
            />
            <span className={selectedGenres.length >= 2 && !selectedGenres.includes("Drama") ? "text-gray-400" : ""}>Drama</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Action"
              {...register("genres")}
              disabled={selectedGenres.length >= 2 && !selectedGenres.includes("Action")}
              className="w-4 h-4 disabled:opacity-50"
            />
            <span className={selectedGenres.length >= 2 && !selectedGenres.includes("Action") ? "text-gray-400" : ""}>Action</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="other"
              {...register("genres")}
              disabled={selectedGenres.length >= 2 && !selectedGenres.includes("other")}
              className="w-4 h-4 disabled:opacity-50"
            />
            <span className={selectedGenres.length >= 2 && !selectedGenres.includes("other") ? "text-gray-400" : ""}>Other (Specify)</span>
          </label>
        </div>

        {/* Validation Error for Genres */}
        {errors.genres && <p className="text-red-500 text-sm">{errors.genres.message as string}</p>}

        {/* Custom Text Field */}
        {selectedGenres.includes("other") && (
          <div className="mt-3 p-3 bg-gray-50 border rounded">
            <label className="block text-sm mb-1">Please specify the custom genre</label>
            <input
              type="text"
              {...register("customGenre", {
                required: "Please specify your required genre",
                validate: (value: string, formValues: any) => {
                  const predefinedCount = (formValues.genres || []).filter((g: string) => g !== "other").length;
                  const customCount = value.split(",").map((s) => s.trim()).filter((s) => s !== "").length;
                  if (predefinedCount + customCount > 2) {
                    return `You can only select a total of 2 genres. You have selected ${predefinedCount + customCount}.`;
                  }
                  return true;
                }
              })}
              className="w-full border p-2 rounded"
              placeholder="e.g. Sci-Fi, Musical"
            />
            {errors.customGenre && <p className="text-red-500 text-sm mt-1">{errors.customGenre.message as string}</p>}
          </div>
        )}

        {/* Live Preview Display (Optional, uses your displayGenres logic) */}
        {displayGenres.length > 0 && (
          <div className="pt-4">
            <div className="flex flex-wrap gap-2">
              {displayGenres.map((genre: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium shadow-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interaction Level */}
      <div>
        <label className="block font-medium mb-1">Interaction Level</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="no"
              {...register("interactionLevel", { required: "Please select a Interaction Level" })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>No</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="medium"
              {...register("interactionLevel")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>Medium</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="high"
              {...register("interactionLevel")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>High</span>
          </label>
        </div>

        {errors.interactionLevel && <p className="text-red-500 text-sm mt-1">{errors.interactionLevel.message as string}</p>}
      </div>

      {/* Performance Duration */}
      <div>
        <label>Performance Duration</label>
        <input {...register("performanceDuration", { required: "Performance Duration is required" })} className="w-full border p-2 rounded mt-1" />
        {errors.performanceDuration && <p className="text-red-500 text-sm">{errors.performanceDuration.message as string}</p>}
      </div>

      {/* Equipment Provided */}
      <div>
        <label className="block font-medium mb-1">Equipment Provided</label>
        <p className="text-sm">Specify if you will provide the equipment/instruments, or if the artist must bring their own.</p>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="no"
              {...register("equipmentProvided", { required: "Please select an option" })}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>No</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="yes"
              {...register("equipmentProvided")}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>Yes</span>
          </label>
        </div>

        {errors.equipmentProvided && <p className="text-red-500 text-sm mt-1">{errors.equipmentProvided.message as string}</p>}
      </div>

    </div>
  );
}