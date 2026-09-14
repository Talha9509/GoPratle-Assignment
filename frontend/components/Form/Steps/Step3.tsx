import { useWatch } from "react-hook-form";

export const Step3 = ({ control, register, errors }: any) => {

  const selectedCategories = useWatch({
    control,
    name: "category",
    defaultValue: []
  });

  return (
    <div className="space-y-4">

      {/* Budgets */}
      <div>
        {/* Budgets for planner */}
        {selectedCategories.includes("planner") && (
          <div>
            <label>Budget for Event Planner</label>
            <input {...register("budgetPlanner", { required: "Budget is required" })} className="w-full border p-2 rounded mt-1" />
            {errors.budgetPlanner && <p className="text-red-500 text-sm">{errors.budgetPlanner.message as string}</p>}
          </div>
        )}

        {/* Budgets for performer */}
        {selectedCategories.includes("performer") && (
          <div>
            <label>Budget for Performer</label>
            <input {...register("budgetPerformer", { required: "Budget is required" })} className="w-full border p-2 rounded mt-1" />
            {errors.budgetPerformer && <p className="text-red-500 text-sm">{errors.budgetPerformer.message as string}</p>}
          </div>
        )}

        {/* Budgets for crew */}
        {selectedCategories.includes("crew") && (
          <div>
            <label>Budget for Crew</label>
            <input {...register("budgetCrew", { required: "Budget is required" })} className="w-full border p-2 rounded mt-1" />
            {errors.budgetCrew && <p className="text-red-500 text-sm">{errors.budgetCrew.message as string}</p>}
          </div>
        )}
      </div>

      {/* Other instructions */}
      <div>
        <label>Other Instructions</label>
        <textarea {...register("instructions")} className="w-full border p-2 rounded mt-1" />
        {errors.instructions && <p className="text-red-500 text-sm">{errors.instructions.message as string}</p>}
      </div>

    </div>
  )
}
