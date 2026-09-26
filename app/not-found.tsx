import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00] shadow-2xl">
          <Dumbbell className="w-12 h-12" />
        </div>
        
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">Error 404 !</h3> <br/>

      <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-display tracking-tight">
        PAGE NOT FOUND
      </h1>
      <p className="text-zinc-400 text-sm sm:text-base max-w-md mt-3 mb-8">
        Fuck ! You have entered the wrong door. Go Back.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#ccff00]/10 hover:scale-[1.02]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO WORKOUT LIBRARY</span>
      </Link>
    </div>
  );
}
