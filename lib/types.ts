export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlanItem extends Workout {
  isDone?: boolean;
  addedAt?: number;
}

export type SortOption = "duration" | "calories" | "rating";
