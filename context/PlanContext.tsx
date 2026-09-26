"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { PlanItem, Workout } from "@/lib/types";

export interface ToastMessage {
  id: string;
  type: "success" | "info" | "error";
  message: string;
}

interface PlanContextType {
  todayPlan: PlanItem[];
  savedWorkouts: PlanItem[];
  addToPlan: (workout: Workout) => { success: boolean; message: string };
  removeFromPlan: (workoutId: number) => void;
  toggleDonePlan: (workoutId: number) => void;
  addToSaved: (workout: Workout) => { success: boolean; message: string };
  removeFromSaved: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  isInSaved: (workoutId: number) => boolean;
  toasts: ToastMessage[];
  addToast: (message: string, type?: "success" | "info" | "error") => void;
  removeToast: (id: string) => void;
  isLoaded: boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const LOCAL_STORAGE_PLAN = "fitlog_today_plan_v1";
const LOCAL_STORAGE_SAVED = "fitlog_saved_workouts_v1";
const MAX_PLAN_CAP = 5;

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<PlanItem[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<PlanItem[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(LOCAL_STORAGE_PLAN);
      const storedSaved = localStorage.getItem(LOCAL_STORAGE_SAVED);

      if (storedPlan) {
        setTodayPlan(JSON.parse(storedPlan));
      }
      if (storedSaved) {
        setSavedWorkouts(JSON.parse(storedSaved));
      }
    } catch (e) {
      console.error("Failed to read from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_PLAN, JSON.stringify(todayPlan));
    } catch (e) {
      console.error("Failed to save plan to localStorage:", e);
    }
  }, [todayPlan, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED, JSON.stringify(savedWorkouts));
    } catch (e) {
      console.error("Failed to save saved list to localStorage:", e);
    }
  }, [savedWorkouts, isLoaded]);

  const addToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isInPlan = (workoutId: number) => {
    return todayPlan.some((item) => item.id === workoutId);
  };

  const isInSaved = (workoutId: number) => {
    return savedWorkouts.some((item) => item.id === workoutId);
  };

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      const msg = `"${workout.name}" is already in Today's Plan.`;
      addToast(msg, "info");
      return { success: false, message: msg };
    }

    if (todayPlan.length >= MAX_PLAN_CAP) {
      const msg = `Today's Plan cap reached (${MAX_PLAN_CAP} lifts limit). Finish them first!`;
      addToast(msg, "error");
      return { success: false, message: msg };
    }

    const newItem: PlanItem = {
      ...workout,
      isDone: false,
      addedAt: Date.now(),
    };

    setTodayPlan((prev) => [...prev, newItem]);
    const msg = `Added "${workout.name}" to Today's Plan! `;
    addToast(msg, "success");
    return { success: true, message: msg };
  };

  const removeFromPlan = (workoutId: number) => {
    const target = todayPlan.find((i) => i.id === workoutId);
    setTodayPlan((prev) => prev.filter((item) => item.id !== workoutId));
    if (target) {
      addToast(`Removed "${target.name}" from Today's Plan.`, "info");
    }
  };

  const toggleDonePlan = (workoutId: number) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === workoutId) {
          const nextState = !item.isDone;
          addToast(
            nextState
              ? `Great work! Marked "${item.name}" as completed. `
              : `Unmarked "${item.name}".`,
            nextState ? "success" : "info"
          );
          return { ...item, isDone: nextState };
        }
        return item;
      })
    );
  };

  const addToSaved = (workout: Workout) => {
    if (isInSaved(workout.id)) {
      const msg = `"${workout.name}" is already in your Saved list.`;
      addToast(msg, "info");
      return { success: false, message: msg };
    }

    const newItem: PlanItem = {
      ...workout,
      addedAt: Date.now(),
    };

    setSavedWorkouts((prev) => [...prev, newItem]);
    const msg = `Saved "${workout.name}" for later! `;
    addToast(msg, "success");
    return { success: true, message: msg };
  };

  const removeFromSaved = (workoutId: number) => {
    const target = savedWorkouts.find((i) => i.id === workoutId);
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== workoutId));
    if (target) {
      addToast(`Removed "${target.name}" from Saved list.`, "info");
    }
  };

  return (
    <PlanContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        toggleDonePlan,
        addToSaved,
        removeFromSaved,
        isInPlan,
        isInSaved,
        toasts,
        addToast,
        removeToast,
        isLoaded,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
