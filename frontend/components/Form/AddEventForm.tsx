"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";
import { useRouter } from 'next/navigation';

export default function AddEventForm() {
  const backend = process.env.NEXT_PUBLIC_BACKEND;
  const router = useRouter()
  const [step, setStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, trigger, control, getValues, formState: { errors } } = useForm({
    mode: "onTouched",
  });

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    let fieldsToValidate: string[] = [];

    if (step === 1) {
      fieldsToValidate = ["eventName", "dateRange", "eventType", "location", "category"];

      const currentEventType = getValues("eventType");
      if (currentEventType === "other") {
        fieldsToValidate.push("customEventType");
      }
    }

    if (step === 2) {
      const selectedCategories = getValues("category") || [];

      // PLANNER 
      if (selectedCategories.includes("planner")) {
        fieldsToValidate.push("services", "foodOption", "guestCount");
        if (getValues("services")?.includes("other")) fieldsToValidate.push("customService");
      }

      // PERFORMER 
      if (selectedCategories.includes("performer")) {
        fieldsToValidate.push("genres", "interactionLevel", "performanceDuration", "equipmentProvided");
        if (getValues("genres")?.includes("other")) fieldsToValidate.push("customGenre");
      }

      // CREW
      if (selectedCategories.includes("crew")) {
        fieldsToValidate.push("crewtype", "crewStartTime", "crewEndTime");

        const rawCrewType = getValues("crewtype");
        const customCrewTypeText = getValues("customCrewType") || "";

        const selectedCrewType = Array.isArray(rawCrewType) ? rawCrewType
          : (typeof rawCrewType === "string" ? [rawCrewType] : []);

        let displayCrewType = selectedCrewType.filter((s: string) => s !== "other");

        if (selectedCrewType.includes("other") && customCrewTypeText.trim() !== "") {
          const customArray = customCrewTypeText
            .split(",")
            .map((s: string) => s.trim())
            .filter((s: string) => s !== "");
          displayCrewType = [...displayCrewType, ...customArray];
        }

        displayCrewType.forEach((service: string) => {
          fieldsToValidate.push(`crewCount_${service}`);
        });

        if (selectedCrewType.includes("other")) fieldsToValidate.push("customCrewType");
      }
    }

    if (step === 3) {
      const selectedCategories = getValues("category") || [];
      fieldsToValidate = ["instructions"];

      if (selectedCategories.includes("planner")) fieldsToValidate.push("budgetPlanner");
      if (selectedCategories.includes("performer")) fieldsToValidate.push("budgetPerformer");
      if (selectedCategories.includes("crew")) fieldsToValidate.push("budgetCrew");
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: any) => {
    if (step != 3) return
    setSubmitError(null);
    setIsSubmitting(true);
    // Step - 1
    const finalEventType = data.eventType === "other" ? data.customEventType : data.eventType;

    const selectedCategories = data.category || [];

    // 1
    const payload: any = {
      eventName: data.eventName,
      eventType: finalEventType,
      startDate: data.dateRange.from,
      endDate: data.dateRange.to || data.dateRange.from,
      startTime: data.startTime,
      endTime: data.endTime,
      location: data.location,
      venue: data.venue,
      instructions: data.instructions,
      categories: selectedCategories,
    };

    // 2. Planner
    if (selectedCategories.includes("planner")) {
      let finalServices = (data.services || []).filter((s: string) => s !== "other");
      if (data.services?.includes("other") && data.customService) {
        const customArray = data.customService.split(",").map((s: string) => s.trim()).filter(Boolean);
        finalServices = [...finalServices, ...customArray];
      }
      payload.plannerDetails = {
        services: finalServices,
        foodOption: data.foodOption,
        guestCount: Number(data.guestCount),
        budget: data.budgetPlanner,
      };
    }

    // 3. Performer
    if (selectedCategories.includes("performer")) {
      let finalGenres = (data.genres || []).filter((s: string) => s !== "other");
      if (data.genres?.includes("other") && data.customGenre) {
        const customArray = data.customGenre.split(",").map((s: string) => s.trim()).filter(Boolean);
        finalGenres = [...finalGenres, ...customArray];
      }
      payload.performerDetails = {
        genres: finalGenres,
        interactionLevel: data.interactionLevel,
        performanceDurationInHours: data.performanceDuration,
        equipmentProvided: data.equipmentProvided,
        budget: data.budgetPerformer,
      };
    }

    // 4. Crew
    if (selectedCategories.includes("crew")) {
      let finalCrewTypes = (data.crewtype || []).filter((s: string) => s !== "other");
      if (data.crewtype?.includes("other") && data.customCrewType) {
        const customArray = data.customCrewType.split(",").map((s: string) => s.trim()).filter(Boolean);
        finalCrewTypes = [...finalCrewTypes, ...customArray];
      }

      const crewList = finalCrewTypes.map((role: string) => ({
        role: role,
        count: Number(data[`crewCount_${role}`])
      }));

      payload.crewDetails = {
        crewList: crewList,
        shiftStartTime: data.crewStartTime,
        shiftEndTime: data.crewEndTime,
        budget: data.budgetCrew,
      };
    }
    console.log("payload")
    console.log(payload)
    console.log("Final Form Data submitted to server:", payload);
    try {
      const response = await fetch(`${backend}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Submission failed (${response.status})`);
      }
      const dataa = await response.json()
      console.log("response from backend")
      console.log(dataa)
      const id = dataa.event._id
      router.push(`/event/${id}`)
    } catch (error: any) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#e2c9a8] bg-white overflow-hidden shadow-md">

      {/* error message */}
      {submitError && (
        <p className="text-red-600 text-sm font-medium">⚠ {submitError}</p>
      )}

      {/* top stripe */}
      <div className="h-3 w-full bg-[#e43d12]" />

      {/* Form Title & Stepper Header */}
      <div className="px-6 py-6 border-b border-[#e2c9a8] bg-[#EBE9E1]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e43d12]">New Listing</span>
            <h1 className="text-2xl font-extrabold text-[#000000] mt-0.5">Post an Event</h1>
            <p className="text-xs text-[#6b4f35] mt-1">Fill in the details to find the best planners, performers, and crew.</p>
          </div>

          {/* Step Indicator Badges */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { num: 1, label: "Basic Info" },
              { num: 2, label: "Role Details" },
              { num: 3, label: "Budget & Notes" },
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${step === s.num
                    ? "bg-[#e43d12] text-white shadow-sm"
                    : step > s.num
                      ? "bg-[#e8f5e9] text-[#1b5e20]"
                      : "bg-white border border-[#e2c9a8] text-[#9c7a5a]"
                  }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${step === s.num
                      ? "bg-white text-[#e43d12]"
                      : step > s.num
                        ? "bg-[#1b5e20] text-white"
                        : "bg-[#f5e6d3] text-[#6b4f35]"
                    }`}
                >
                  {step > s.num ? "✓" : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && <Step1 control={control} register={register} errors={errors} />}
          {step === 2 && <Step2 control={control} register={register} errors={errors} />}
          {step === 3 && <Step3 control={control} register={register} errors={errors} />}

          <div className="flex items-center justify-between pt-6 border-t border-[#e2c9a8] mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2.5 rounded-xl font-semibold border border-[#e2c9a8] text-[#6b4f35] bg-[#EBE9E1] hover:bg-[#f5e6d3] transition flex items-center gap-1.5 text-sm cursor-pointer"
              >
                ← Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={(e) => nextStep(e)}
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-[#e43d12] hover:bg-[#c4500e] transition shadow-sm ml-auto flex items-center gap-1.5 text-sm cursor-pointer"
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl font-semibold text-white bg-[#e43d12] hover:bg-[#a44215] transition shadow-sm ml-auto flex items-center gap-1.5 text-sm cursor-pointer"
              >
                Publish Event
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

