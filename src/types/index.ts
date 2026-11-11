export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  bmi: number;
  goal: 'weight_loss' | 'muscle_gain' | 'endurance' | 'flexibility';
  level: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  streak: number;
  badges: Badge[];
}

export interface WorkoutSession {
  id: string;
  userId: string;
  date: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  exercises: Exercise[];
  accuracyScore: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  reps: number;
  sets: number;
  completed: boolean;
  accuracyScores: number[];
}

export interface TalentProfile {
  userId: string;
  speed: number;
  flexibility: number;
  endurance: number;
  strength: number;
  coordination: number;
  recommendedSports: Sport[];
  assessmentDate: string;
}

export interface Sport {
  name: string;
  score: number;
  description: string;
  icon: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  target: number;
  completed: boolean;
  expiresAt: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  goal: string;
  level: string;
  duration: string;
  exercises: PlanExercise[];
}

export interface PlanExercise {
  name: string;
  sets: number;
  reps: number;
  duration?: number;
  restTime: number;
  instructions: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  points: number;
  streak: number;
  workoutsCompleted: number;
}
