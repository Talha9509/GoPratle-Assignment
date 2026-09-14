"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";

export default function AddEventForm() {
  const [step, setStep] = useState(1);

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

  const onSubmit = (data: any) => {
    if (step != 3) return
    // Step - 1
    const finalEventType = data.eventType === "other" ? data.customEventType : data.eventType;

    // Step - 2: Planner
    let finalServices = (data.services || [])
      .filter((service: string) => service !== "other")

      if (data.services?.includes("other") && data.customService) {
      const customArray = data.customService
        .split(",")
        .map((s: string) => s.trim())
        .filter((s: string) => s !== "");
        
      finalServices = [...finalServices, ...customArray];
    }

    const payload = {
      eventName: data.eventName,
      eventType: finalEventType,
      eventStartDate: data.dateRange.from,
      eventEndDate: data.dateRange.to || data.dateRange.from,
      location: data.location,
      color: data.color,
      planner: data.plannerExperience,
      services: finalServices,
    };
    console.log(payload)
    console.log("Final Form Data submitted to server:", payload);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">

      <div className="mb-6 text-sm font-medium text-gray-500">Step {step} of 3</div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && <Step1 control={control} register={register} errors={errors} />}
        {step === 2 && <Step2 control={control} register={register} errors={errors} />}
        {step === 3 && <Step3 control={control} register={register} errors={errors} />}

        <div className="flex justify-between mt-8">
          {step > 1 && <button type="button" onClick={prevStep} className="px-4 py-2 border rounded">Back</button>}

          {step < 3 ? (
            <button type="button" onClick={(e) => nextStep(e)} className="px-4 py-2 bg-blue-600 text-white rounded ml-auto">Next</button>
          ) : (
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded ml-auto">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}

