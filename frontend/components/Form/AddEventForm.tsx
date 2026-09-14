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
    console.log(payload)
    console.log("Final Form Data submitted to server:", payload);
    const response = await fetch(`${backend}/api/events`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload) 
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } 
    const dataa = await response.json()
    const id = dataa.event._id
    router.push(`/event/${id}`)
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

