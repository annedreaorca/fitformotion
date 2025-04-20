"use client";
import { ActivityModalProvider } from "@/contexts/ActivityModalContext";
import FormatDuration from "@/utils/FormatDuration";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import ActivityMenu from "./ActivityMenu";
import ActivityModal from "./ActivityModal";

// Define the types to match your context
type TrackingType = "WEIGHT_REPS" | "DURATION" | "DISTANCE" | "REPS_ONLY";

interface Set {
  weight: number | null;
  reps: number | null;
  exerciseDuration: number | null;
}

interface Exercise {
  id: string;
  exerciseId: string;
  trackingType: TrackingType;
  Exercise: {
    name: string;
  };
  sets: Set[];
}

interface WorkoutPlan {
  name: string;
}

interface Activity {
  id: string;
  duration: number;
  date: string;
  WorkoutPlan: WorkoutPlan;
  exercises: Exercise[];
}

// Mock data for demo purposes
const mockWorkouts: Activity[] = [
  {
    id: "1",
    duration: 3600, // 1 hour in seconds
    date: "2025-04-18T10:30:00.000Z",
    WorkoutPlan: {
      name: "Upper Body Strength",
    },
    exercises: [
      {
        id: "ex1",
        exerciseId: "bench-press",
        trackingType: "WEIGHT_REPS",
        Exercise: {
          name: "Bench Press",
        },
        sets: [
          { weight: 135, reps: 10, exerciseDuration: null },
          { weight: 155, reps: 8, exerciseDuration: null },
          { weight: 175, reps: 6, exerciseDuration: null },
        ],
      },
      {
        id: "ex2",
        exerciseId: "pull-ups",
        trackingType: "WEIGHT_REPS",
        Exercise: {
          name: "Pull-Ups",
        },
        sets: [
          { weight: 0, reps: 12, exerciseDuration: null },
          { weight: 0, reps: 10, exerciseDuration: null },
          { weight: 0, reps: 8, exerciseDuration: null },
        ],
      },
      {
        id: "ex3",
        exerciseId: "shoulder-press",
        trackingType: "WEIGHT_REPS",
        Exercise: {
          name: "Shoulder Press",
        },
        sets: [
          { weight: 95, reps: 10, exerciseDuration: null },
          { weight: 105, reps: 8, exerciseDuration: null },
          { weight: 115, reps: 6, exerciseDuration: null },
        ],
      },
    ],
  },
  {
    id: "2",
    duration: 2700, // 45 minutes in seconds
    date: "2025-04-16T15:45:00.000Z",
    WorkoutPlan: {
      name: "Leg Day",
    },
    exercises: [
      {
        id: "ex4",
        exerciseId: "squats",
        trackingType: "WEIGHT_REPS",
        Exercise: {
          name: "Squats",
        },
        sets: [
          { weight: 185, reps: 10, exerciseDuration: null },
          { weight: 205, reps: 8, exerciseDuration: null },
          { weight: 225, reps: 6, exerciseDuration: null },
        ],
      },
      {
        id: "ex5",
        exerciseId: "leg-press",
        trackingType: "WEIGHT_REPS",
        Exercise: {
          name: "Leg Press",
        },
        sets: [
          { weight: 300, reps: 12, exerciseDuration: null },
          { weight: 340, reps: 10, exerciseDuration: null },
          { weight: 380, reps: 8, exerciseDuration: null },
        ],
      },
    ],
  },
  {
    id: "3",
    duration: 1800, // 30 minutes in seconds
    date: "2025-04-14T08:20:00.000Z",
    WorkoutPlan: {
      name: "Core & Cardio",
    },
    exercises: [
      {
        id: "ex6",
        exerciseId: "plank",
        trackingType: "DURATION",
        Exercise: {
          name: "Plank",
        },
        sets: [
          { weight: null, reps: null, exerciseDuration: 60 },
          { weight: null, reps: null, exerciseDuration: 45 },
          { weight: null, reps: null, exerciseDuration: 30 },
        ],
      },
      {
        id: "ex7",
        exerciseId: "treadmill",
        trackingType: "DURATION",
        Exercise: {
          name: "Treadmill",
        },
        sets: [
          { weight: null, reps: null, exerciseDuration: 600 },
        ],
      },
    ],
  },
];

export default function ActivityList() {
  // Specify the type for workouts state
  const [workouts, setWorkouts] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEmptyState, setShowEmptyState] = useState(false);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchWorkouts = async () => {
      try {
        // Simulate network delay
        setTimeout(() => {
          setWorkouts(mockWorkouts);
          setLoading(false);
          setShowEmptyState(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // For demo purposes - to show empty state
  const toggleEmptyState = () => {
    if (showEmptyState) {
      setWorkouts(mockWorkouts);
      setShowEmptyState(false);
    } else {
      setWorkouts([]);
      setShowEmptyState(true);
    }
  };

  if (loading) {
    return <div className="h-48 w-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <ActivityModalProvider>
      <div className="mb-4">
        {/* <button 
          onClick={toggleEmptyState} 
          className="px-3 py-2 bg-zinc-800 text-white rounded-md text-sm"
        >
          {showEmptyState ? "Show Demo Workouts" : "Show Empty State"}
        </button> */}
      </div>
      
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {workouts.map((activity) => {
            const totalWeight = activity.exercises.reduce((total: number, exercise: Exercise) => {
              const exerciseWeight = exercise.sets.reduce(
                (total: number, set: Set) => total + (set.weight || 0),
                0,
              );
              return total + exerciseWeight;
            }, 0);

            return (
              <Card
                key={activity.id}
                shadow="none"
                className="shadow-md gap-2"
              >
                <CardHeader className="px-5 pt-4 flex-col items-start gap-1">
                  <div className="flex justify-between gap-2 w-full items-center">
                    <div className="tracking-tight grow">
                      <time>
                        {format(new Date(activity.date), "MM/dd/yyyy")}
                      </time>
                      <span className="text-zinc-500"> | </span>
                      <span>
                        <FormatDuration seconds={activity.duration} />
                      </span>
                      <span className="text-zinc-500"> | </span>
                      <span>{totalWeight} lbs</span>
                    </div>
                    <ActivityMenu activity={activity} />
                  </div>
                  <p className="text-sm text-zinc-400 leading-5">
                    {activity.WorkoutPlan.name}
                  </p>
                </CardHeader>
                <CardBody className="pt-0 px-5 pb-5">
                  <ul className="border-l-[1px] border-zinc-600 pl-3">
                    {activity.exercises.map((exercise: Exercise) => (
                      <li
                        key={exercise.id}
                        className="flex gap-2 justify-between text-sm text-zinc-300"
                      >
                        <p className="grow truncate">
                          {exercise.Exercise.name}
                        </p>
                        <p className="shrink-0">{exercise.sets.length} Sets</p>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            );
          })}
          <ActivityModal />
        </div>
      ) : (
        <p>
          No workouts have been completed.{" "}
          <Link className="text-danger dark:text-danger" href="/workout">
            Click here to start one
          </Link>
          .
        </p>
      )}
    </ActivityModalProvider>
  );
}