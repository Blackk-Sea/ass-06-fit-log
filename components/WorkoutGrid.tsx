"use client";

import React, { useState, useMemo } from "react";
import { Workout, SortOption } from "@/lib/types";
import { WorkoutCard } from "./WorkoutCard";
import { SortSelect } from "./SortSelect";
import { Search, Sparkles } from "lucide-react";

interface WorkoutGridProps {
  workouts: Workout[];
  isLoading: boolean;
}

export const WorkoutGrid: React.FC<WorkoutGridProps> = ({ workouts, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  // Extract unique muscle groups
  const allMuscleGroups = useMemo(() => {
    const set = new Set<string>();
    workouts.forEach((w) => {
      w.muscleGroups?.forEach((m) => set.add(m));
    });
    return ["ALL", ...Array.from(set)];
  }, [workouts]);

  // Filter and sort workouts
  const filteredAndSorted = useMemo(() => {
    let result = [...workouts];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    }

    // Filter by muscle group tag
    if (selectedMuscle !== "ALL") {
      result = result.filter((w) =>
        w.muscleGroups.some((m) => m.toUpperCase() === selectedMuscle.toUpperCase())
      );
    }

    // Sort by duration, calories, or rating
    result.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned; // highest first
      }
      if (sortBy === "rating") {
        return b.rating - a.rating; // highest first
      }
      return 0;
    });

    return result;
  }, [workouts, searchQuery, selectedMuscle, sortBy]);

  return (
    <section id="library" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#ccff00] tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            CATALOGUE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight font-display">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort Select (C1 Challenge requirement) */}
        <div className="shrink-0">
          <SortSelect sortBy={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lift name, equipment, or muscle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 text-white placeholder-zinc-500 text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-[#ccff00] transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {allMuscleGroups.map((muscle) => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap ${
                selectedMuscle === muscle
                  ? "bg-[#ccff00] text-black"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900/60 rounded-2xl border border-zinc-800/80 p-4 space-y-4 animate-pulse"
            >
              <div className="w-full aspect-[4/3] bg-zinc-800/60 rounded-xl" />
              <div className="h-5 bg-zinc-800/80 rounded w-3/4" />
              <div className="h-4 bg-zinc-800/50 rounded w-1/2" />
              <div className="h-8 bg-zinc-800/40 rounded pt-2" />
            </div>
          ))}
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-12 text-center space-y-3">
          <p className="text-xl font-bold text-white font-display">NO LIFTS FOUND</p>
          <p className="text-sm text-zinc-400">
            No exercises match your search query &quot;{searchQuery}&quot;. Try resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedMuscle("ALL");
            }}
            className="inline-block mt-3 bg-zinc-800 hover:bg-zinc-700 text-[#ccff00] text-xs font-bold px-4 py-2 rounded-xl transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* 3x4 Grid on Large Screens */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};
