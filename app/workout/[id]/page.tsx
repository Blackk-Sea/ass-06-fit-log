"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { fetchWorkoutById } from "@/lib/api";
import { Workout } from "@/lib/types";
import { usePlan } from "@/context/PlanContext";
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
  Dumbbell,
  Layers,
  Bookmark,
  Check,
  ShieldAlert,
  Loader2,
} from "lucide-react";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved, isInPlan, isInSaved, todayPlan } = usePlan();

  useEffect(() => {
    let isMounted = true;
    async function loadWorkout() {
      if (!id) return;
      setLoading(true);
      const data = await fetchWorkoutById(id);
      if (isMounted) {
        setWorkout(data);
        setLoading(false);
      }
    }
    loadWorkout();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#ccff00]" />
        <p className="text-sm font-semibold tracking-wide">Loading exercise details...</p>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[70vh] max-w-xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black font-display uppercase text-white">
          Workout Not Found
        </h1>
        <p className="text-zinc-400 text-sm">
          We couldn&apos;t find the exercise you were looking for. It may have been removed or the ID is invalid.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-[#b3e600] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Library
        </Link>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const isPlanFull = todayPlan.length >= 5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#ccff00] transition-colors bg-zinc-900/80 px-3.5 py-2 rounded-lg border border-zinc-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO LIBRARY</span>
        </button>
      </div>

      {/* Two Column Layout (Left: Media, Right: Info) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Side — Visual / Media */}
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Category Tag Pills Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="bg-black/80 backdrop-blur-md text-[#ccff00] text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-md border border-[#ccff00]/40"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side — Sections & Details */}
        <div className="lg:col-span-6 space-y-6">
          {/* Title & Description */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
              {workout.name}
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Key Specs Panel */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold text-[#ccff00] tracking-widest uppercase mb-3 flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              KEY SPECIFICATIONS
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                <span className="block text-zinc-500 font-bold uppercase text-[10px]">Equipment</span>
                <span className="font-semibold text-white mt-0.5 block truncate">{workout.equipment}</span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                <span className="block text-zinc-500 font-bold uppercase text-[10px]">Difficulty</span>
                <span className="font-semibold text-white mt-0.5 block">{workout.difficulty}</span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                <span className="block text-zinc-500 font-bold uppercase text-[10px]">Sets / Reps</span>
                <span className="font-semibold text-white mt-0.5 block">
                  {workout.sets} sets &bull; {workout.reps}
                </span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                <span className="block text-zinc-500 font-bold uppercase text-[10px]">Duration</span>
                <span className="font-semibold text-white mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#ccff00]" />
                  {workout.duration} min
                </span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                <span className="block text-zinc-500 font-bold uppercase text-[10px]">Calories</span>
                <span className="font-semibold text-white mt-0.5 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" />
                  {workout.caloriesBurned} kcal
                </span>
              </div>
              <div className="bg-zinc-950/60 p-3 rounded-xl border border-zinc-800/80">
                <span className="block text-zinc-500 font-bold uppercase text-[10px]">Rating</span>
                <span className="font-semibold text-white mt-0.5 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {workout.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 space-y-4">
            <h2 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
              INSTRUCTIONS
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#ccff00]/10 text-[#ccff00] font-black text-xs shrink-0 mt-0.5 border border-[#ccff00]/30">
                    {idx + 1}
                  </span>
                  <span className="leading-snug pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {/* Primary Button: Add to today's plan */}
            <button
              onClick={() => addToPlan(workout)}
              disabled={inPlan || isPlanFull}
              className={`flex-1 flex items-center justify-center gap-2 font-extrabold px-6 py-4 rounded-xl transition-all text-xs sm:text-sm uppercase tracking-wider ${
                inPlan
                  ? "bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700"
                  : isPlanFull
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-800"
                  : "bg-[#ccff00] hover:bg-[#b3e600] text-black shadow-lg shadow-[#ccff00]/10 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {inPlan ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>IN TODAY&apos;S PLAN</span>
                </>
              ) : isPlanFull ? (
                <>
                  <Layers className="w-4 h-4" />
                  <span>PLAN FULL (MAX 5 LIFTS)</span>
                </>
              ) : (
                <>
                  <Layers className="w-4 h-4" />
                  <span>ADD TO TODAY&apos;S PLAN</span>
                </>
              )}
            </button>

            {/* Secondary Button: Save for later */}
            <button
              onClick={() => addToSaved(workout)}
              disabled={inSaved}
              className={`flex items-center justify-center gap-2 font-bold px-6 py-4 rounded-xl border transition-all text-xs sm:text-sm uppercase tracking-wider ${
                inSaved
                  ? "bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-zinc-900 border-zinc-700 text-zinc-200 hover:text-white hover:border-zinc-500 hover:bg-zinc-800"
              }`}
            >
              {inSaved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3] text-zinc-500" />
                  <span>SAVED</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-zinc-400" />
                  <span>SAVE FOR LATER</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
