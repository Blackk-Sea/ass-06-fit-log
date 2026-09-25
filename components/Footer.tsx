import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-7 h-7 flex items-center justify-center rounded-md bg-zinc-900 border border-zinc-800">
            <Image
              src="/assets/logo.png"
              alt="FitLog Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white font-display">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>

        {/* Right: Copyright line */}
        <p className="text-xs text-zinc-500 font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};
