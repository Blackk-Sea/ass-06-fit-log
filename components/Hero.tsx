"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export const Hero: React.FC = () => {
  const scrollToLibrary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("library");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800/80 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-[#ccff00]/30 text-[#ccff00] text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
              WORKOUT LIBRARY
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none font-display">
              TRAIN WITH INTENT. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#ccff00]">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              FitLog is a dark themed gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Primary CTA Button */}
            <a
              href="#library"
              onClick={scrollToLibrary}
              className="inline-flex items-center gap-3 bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold px-6 py-4 rounded-xl transition-all shadow-lg shadow-[#ccff00]/10 hover:shadow-[#ccff00]/20 hover:scale-[1.02] active:scale-[0.98] text-sm tracking-wider uppercase"
            >
              <span>BROWSE WORKOUTS</span>
              <ArrowDown className="w-4 h-4 text-black animate-bounce" />
            </a>
          </div>

          {/* Right Banner Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square md:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/80 shadow-2xl group">
              <Image
                src="/assets/banner.png"
                alt="FitLog Gym Companion Banner"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
