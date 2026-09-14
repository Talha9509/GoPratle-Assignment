import { useWatch } from "react-hook-form";

export const Step3 = ({ control, register, errors }: any) => {
  const selectedCategories = useWatch({
    control,
    name: "category",
    defaultValue: [],
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e2c9a8] pb-3">
        <h2 className="text-lg font-bold text-[#000000]">Budget & Instructions</h2>
        <p className="text-xs text-[#6b4f35] mt-0.5">
          Specify your budget allocations for each selected role and any general instructions.
        </p>
      </div>

      {/* Budgets Section */}
      <div className="space-y-4">
        {/* Budgets for planner */}
        {selectedCategories.includes("planner") && (
          <div className="p-4 rounded-2xl border border-[#e2c9a8] bg-[#fff3e0]/30 space-y-1.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full uppercase bg-[#fff3e0] text-[#e65100]">
                Event Planner
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
                Budget Range / Amount <span className="text-[#e43d12]">*</span>
              </label>
            </div>
            <input
              {...register("budgetPlanner", { required: "Budget is required" })}
              placeholder="e.g. ₹50,000 – ₹1,00,000"
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
            />
            {errors.budgetPlanner && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.budgetPlanner.message as string}
              </p>
            )}
          </div>
        )}

        {/* Budgets for performer */}
        {selectedCategories.includes("performer") && (
          <div className="p-4 rounded-2xl border border-[#e2c9a8] bg-[#fce4ec]/30 space-y-1.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full uppercase bg-[#fce4ec] text-[#880e4f]">
                Performer
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
                Budget Range / Amount <span className="text-[#e43d12]">*</span>
              </label>
            </div>
            <input
              {...register("budgetPerformer", { required: "Budget is required" })}
              placeholder="e.g. ₹30,000 – ₹60,000"
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
            />
            {errors.budgetPerformer && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.budgetPerformer.message as string}
              </p>
            )}
          </div>
        )}

        {/* Budgets for crew */}
        {selectedCategories.includes("crew") && (
          <div className="p-4 rounded-2xl border border-[#e2c9a8] bg-[#e8f5e9]/30 space-y-1.5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full uppercase bg-[#e8f5e9] text-[#1b5e20]">
                Crew
              </span>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#6b4f35]">
                Budget Range / Amount <span className="text-[#e43d12]">*</span>
              </label>
            </div>
            <input
              {...register("budgetCrew", { required: "Budget is required" })}
              placeholder="e.g. ₹20,000 – ₹40,000"
              className="w-full border border-[#e2c9a8] p-2.5 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition"
            />
            {errors.budgetCrew && (
              <p className="text-red-600 text-xs mt-1 font-medium">
                {errors.budgetCrew.message as string}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Other instructions */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b4f35] mb-1">
          Special Instructions & Notes <span className="text-xs font-normal text-[#9c7a5a] lowercase">(optional)</span>
        </label>
        <textarea
          {...register("instructions")}
          placeholder="Add any specific requirements, timing details, dress codes, or venue guidelines..."
          className="w-full border border-[#e2c9a8] p-3 rounded-xl bg-white text-[#000000] placeholder-[#9c7a5a] focus:outline-none focus:border-[#e43d12] focus:ring-1 focus:ring-[#e43d12] text-sm transition min-h-[120px]"
        />
        {errors.instructions && (
          <p className="text-red-600 text-xs mt-1 font-medium">
            {errors.instructions.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
