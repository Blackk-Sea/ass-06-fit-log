"use client";

import React from "react";
import { usePlan } from "@/context/PlanContext";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = usePlan();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === "success"
              ? "bg-zinc-900/95 border-[#ccff00]/40 text-white"
              : toast.type === "error"
              ? "bg-zinc-900/95 border-red-500/40 text-white"
              : "bg-zinc-900/95 border-zinc-700/60 text-zinc-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            )}
            <p className="text-sm font-medium leading-snug">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
