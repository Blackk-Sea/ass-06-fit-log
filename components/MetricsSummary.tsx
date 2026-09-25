"use client";

import React from "react";
import { PlanItem } from "@/lib/types";
import { Dumbbell, Clock, Flame } from "lucide-react";

interface MetricsSummaryProps {
  items: PlanItem[];
  titleSuffix?: string;
}

export const MetricsSummary: React.FC<MetricsSummaryProps> = ({ items, titleSuffix }) => {
  const totalExercises = items.length;
  const totalMinutes = items.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = items.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);
  const completedCount = items.filter((i) => i.isDone).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
      {/* Exercises Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-colors">
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Exercises {titleSuffix ? `(${titleSuffix})` : ""}
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-white font-display">
              {totalExercises}
            </span>
            {completedCount > 0 && (
              <span className="text-xs font-semibold text-[#ccff00]">
                ({completedCount} done)
              </span>
            )}
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-[#ccff00] group-hover:scale-110 transition-transform">
          <Dumbbell className="w-6 h-6" />
        </div>
      </div>

      {/* Minutes Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-colors">
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Minutes
          </p>
          <p className="text-3xl font-black text-white font-display mt-1">
            {totalMinutes} <span className="text-xs font-normal text-zinc-400">min</span>
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-[#ccff00] group-hover:scale-110 transition-transform">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* Calories Card */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-zinc-700 transition-colors">
        <div>
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Calories
          </p>
          <p className="text-3xl font-black text-white font-display mt-1">
            {totalCalories} <span className="text-xs font-normal text-zinc-400">kcal</span>
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
          <Flame className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
