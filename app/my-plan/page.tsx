"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { MetricsSummary } from "@/components/MetricsSummary";
import { PlanCard } from "@/components/PlanCard";
import { Layers, Bookmark, ArrowRight, Loader2, Dumbbell } from "lucide-react";

function MyPlanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "plan";

  const [activeTab, setActiveTab] = useState<"plan" | "saved">(initialTab);
  const {
    todayPlan,
    savedWorkouts,
    removeFromPlan,
    toggleDonePlan,
    removeFromSaved,
    isLoaded,
  } = usePlan();

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "plan") {
      setActiveTab("plan");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "plan" | "saved") => {
    setActiveTab(tab);
    router.replace(`/my-plan?tab=${tab}`, { scroll: false });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#ccff00]" />
        <p className="text-sm font-semibold tracking-wide">Loading workouts…</p>
      </div>
    );
  }

  const currentList = activeTab === "plan" ? todayPlan : savedWorkouts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header Title & Subtitle */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] tracking-widest uppercase mb-2">
          <Dumbbell className="w-3.5 h-3.5" />
          WORKOUT LOG & PLANNER
        </div>
        <h1 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-tight font-display">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <MetricsSummary
        items={currentList}
        titleSuffix={activeTab === "plan" ? "Today's Plan" : "Saved"}
      />

      {/* Tabs Row */}
      <div className="flex items-center justify-between border-b border-zinc-800 mb-6">
        <div className="flex gap-2">
          {/* Today's Plan Tab */}
          <button
            onClick={() => handleTabChange("plan")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "plan"
                ? "border-[#ccff00] text-[#ccff00] bg-zinc-900/50"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Today&apos;s Plan</span>
            <span className="bg-zinc-800 text-zinc-200 text-xs px-2 py-0.5 rounded-full font-sans font-bold">
              {todayPlan.length}
            </span>
          </button>

          {/* Saved Tab */}
          <button
            onClick={() => handleTabChange("saved")}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === "saved"
                ? "border-[#ccff00] text-[#ccff00] bg-zinc-900/50"
                : "border-transparent text-zinc-400 hover:text-white"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved</span>
            <span className="bg-zinc-800 text-zinc-200 text-xs px-2 py-0.5 rounded-full font-sans font-bold">
              {savedWorkouts.length}
            </span>
          </button>
        </div>
      </div>

      {/* List / Empty State */}
      {currentList.length === 0 ? (
        /* Empty State */
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-12 text-center my-8 flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800/60 border border-zinc-700 flex items-center justify-center text-zinc-500">
            {activeTab === "plan" ? (
              <Layers className="w-8 h-8" />
            ) : (
              <Bookmark className="w-8 h-8" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase text-white font-display tracking-tight">
              NOTHING HERE YET
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-md">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save your favorite lifts to quickly access them later."}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ccff00]/10 hover:scale-[1.02]"
          >
            <span>GO TO WORKOUTS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Workout cards list */
        <div className="space-y-4 my-6">
          {currentList.map((item) => (
            <PlanCard
              key={item.id}
              item={item}
              isSavedTab={activeTab === "saved"}
              onMarkDone={activeTab === "plan" ? toggleDonePlan : undefined}
              onRemove={activeTab === "plan" ? removeFromPlan : removeFromSaved}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-zinc-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#ccff00]" />
          <p className="text-sm font-semibold tracking-wide">Loading workouts…</p>
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}
