"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { WorkoutGrid } from "@/components/WorkoutGrid";
import { fetchAllWorkouts } from "@/lib/api";
import { Workout } from "@/lib/types";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      const data = await fetchAllWorkouts();
      if (isMounted) {
        setWorkouts(data);
        setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <WorkoutGrid workouts={workouts} isLoading={isLoading} />
    </div>
  );
}
