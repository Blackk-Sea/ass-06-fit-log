"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/lib/types";
import { Clock, Flame, Star, Dumbbell } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col bg-zinc-900/90 rounded-2xl border border-zinc-800/80 overflow-hidden hover:border-[#ccff00]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#ccff00]/5 hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] bg-zinc-950 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />

        {/* Category Pills Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {workout.muscleGroups.map((group, idx) => (
            <span
              key={idx}
              className="bg-black/75 backdrop-blur-md text-[#ccff00] text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#ccff00]/30"
            >
              {group}
            </span>
          ))}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Workout Name */}
          <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors leading-tight line-clamp-1">
            {workout.name}
          </h3>

          {/* Equipment Line */}
          <div className="flex items-center gap-1.5 mt-2 text-zinc-400 text-xs font-medium">
            <Dumbbell className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{workout.equipment}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-300 font-semibold">
          {/* Duration */}
          <div className="flex items-center gap-1" title="Duration">
            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1" title="Calories Burned">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1" title="Rating">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
