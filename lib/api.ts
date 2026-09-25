import { Workout } from "./types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function fetchAllWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.statusText}`);
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    if (data && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (err) {
    console.error("API Error fetchAllWorkouts:", err);
    return [];
  }
}

export async function fetchWorkoutById(id: string | number): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (!res.ok) {
      // Fallback: fetch all and find by id if single endpoint returns error
      const all = await fetchAllWorkouts();
      return all.find((item) => String(item.id) === String(id)) || null;
    }
    const data = await res.json();
    if (data && data.id) {
      return data as Workout;
    }
    if (data && data.data) {
      return data.data as Workout;
    }
    return null;
  } catch (err) {
    console.error(`API Error fetchWorkoutById (${id}):`, err);
    // Fallback search
    try {
      const all = await fetchAllWorkouts();
      return all.find((item) => String(item.id) === String(id)) || null;
    } catch {
      return null;
    }
  }
}
