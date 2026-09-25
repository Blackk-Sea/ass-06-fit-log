"use client";

import React from "react";
import { SortOption } from "@/lib/types";
import { ArrowUpDown, ChevronDown } from "lucide-react";

interface SortSelectProps {
  sortBy: SortOption;
  onChange: (sort: SortOption) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ sortBy, onChange }) => {
  return (
    <div className="relative inline-flex items-center gap-2">
      <label htmlFor="sort-select" className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
        <ArrowUpDown className="w-3.5 h-3.5 text-[#ccff00]" />
        Sort By:
      </label>
      <div className="relative">
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none bg-zinc-900 text-white text-xs font-semibold px-4 py-2 pr-9 rounded-lg border border-zinc-800 hover:border-zinc-700 focus:outline-none focus:border-[#ccff00] transition-colors cursor-pointer"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
        <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};
