"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlanItem } from "@/lib/types";
import { Clock, Flame, Star, Dumbbell, Check, X, ExternalLink } from "lucide-react";

interface PlanCardProps {
  item: PlanItem;
  onMarkDone?: (id: number) => void;
  onRemove: (id: number) => void;
  isSavedTab?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
  item,
  onMarkDone,
  onRemove,
  isSavedTab = false,
}) => {
  return (
    <div
      className={`relative group bg-zinc-900/90 border rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-300 ${
        item.isDone
          ? "border-[#ccff00]/40 bg-zinc-900/40 opacity-80"
          : "border-zinc-800 hover:border-zinc-700"
      }`}
    >
      {/* Done Badge Overlay */}
      {item.isDone && (
        <div className="absolute top-3 right-3 bg-[#ccff00] text-black text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full z-10 flex items-center gap-1 shadow-md">
          <Check className="w-3 h-3 stroke-[3]" />
          COMPLETED
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative w-full sm:w-28 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-zinc-950 shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
            item.isDone ? "grayscale-[40%]" : ""
          }`}
        />
      </div>

      {/* Info Column */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`font-display font-extrabold text-lg sm:text-xl uppercase tracking-tight ${
                item.isDone ? "line-through text-zinc-400" : "text-white"
              }`}
            >
              {item.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
            <Dumbbell className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>{item.equipment}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-300 pt-2 border-t border-zinc-800/60">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>{item.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{item.caloriesBurned} kcal</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{item.rating}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Column */}
      <div className="flex sm:flex-col items-center justify-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800/80 shrink-0">
        {/* View Details */}
        <Link
          href={`/workout/${item.id}`}
          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
          title="View Details"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Details</span>
        </Link>

        {!isSavedTab && onMarkDone && (
          <button
            onClick={() => onMarkDone(item.id)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all ${
              item.isDone
                ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                : "bg-[#ccff00] hover:bg-[#b3e600] text-black"
            }`}
            title={item.isDone ? "Unmark as Done" : "Mark as Done"}
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{item.isDone ? "Done" : "Mark Done"}</span>
          </button>
        )}

        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 bg-zinc-800/70 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-xl transition-colors"
          title="Remove"
          aria-label="Remove workout"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
