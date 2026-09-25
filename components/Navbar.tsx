"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { Dumbbell, Bookmark, Layers } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTabParam = searchParams.get("tab");
  const { todayPlan, savedWorkouts } = usePlan();

  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900 border border-zinc-700 group-hover:border-[#ccff00] transition-colors overflow-hidden">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-xl tracking-wider text-white font-display">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </Link>

        {/* Middle Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
              isHome
                ? "bg-zinc-800 text-[#ccff00] border border-zinc-700"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
              isMyPlan
                ? "bg-zinc-800 text-[#ccff00] border border-zinc-700"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right Status Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan Badge - Filled Accent Pill */}
          <Link
            href="/my-plan?tab=plan"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
              isMyPlan && activeTabParam !== "saved"
                ? "bg-[#ccff00] text-black ring-2 ring-[#ccff00]/50"
                : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
            }`}
            title="Today's Plan"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] text-[11px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved Badge - Outlined Pill */}
          <Link
            href="/my-plan?tab=saved"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              isMyPlan && activeTabParam === "saved"
                ? "border-[#ccff00] text-[#ccff00] bg-zinc-900"
                : "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white bg-zinc-900/50"
            }`}
            title="Saved Workouts"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved</span>
            <span className="bg-zinc-800 text-zinc-200 text-[11px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] text-center border border-zinc-700">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
