import { useWatch } from "react-hook-form";
import { Planner } from "./Category/Planner";
import { Performer } from "./Category/Performer";
import { Crew } from "./Category/Crew";

export const Step2 = ({ control, register, errors }: any) => {
  const selectedCategories = useWatch({
    control,
    name: "category",
    defaultValue: [],
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e2c9a8] pb-3">
        <h2 className="text-lg font-bold text-[#000000]">Role-Specific Requirements</h2>
        <p className="text-xs text-[#6b4f35] mt-0.5">
          Configure details for the professional categories you selected in Step 1.
        </p>
      </div>

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
        <div className="p-4 rounded-xl border border-[#fed7aa] bg-[#fff3e0] text-[#c4500e] text-sm font-medium">
          Please go back and select at least one role category to configure.
        </div>
      )}
    </div>
  );
};