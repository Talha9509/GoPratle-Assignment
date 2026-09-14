import { useWatch } from "react-hook-form";
import { Planner } from './Category/Planner'
import { Performer } from "./Category/Performer";
import { Crew } from "./Category/Crew";

export const Step2 = ({ control, register, errors }: any) => {

  const selectedCategories = useWatch({
    control,
    name: "category",
    defaultValue: []
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Role Specific Details</h2>

      {selectedCategories.includes("planner") && (
        <Planner control={control} register={register} errors={errors} />
      )}

      {selectedCategories.includes("performer") && (
        <Performer control={control} register={register} errors={errors} />
      )}

      {selectedCategories.includes("crew") && (
        <Crew control={control} register={register} errors={errors} />
      )}

      {selectedCategories.length === 0 && (
        <p className="text-gray-500 italic">Please go back and select a category.</p>
      )}
    </div>

  )
}