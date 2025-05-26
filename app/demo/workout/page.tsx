"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { IconDots, IconPlayerPlayFilled, IconPlus, IconWalk } from "@tabler/icons-react";
import { format } from "date-fns";
import Link from 'next/link';
import { useState } from 'react';

// Type definitions
type Exercise = {
  id: string;
  name: string;
  category: string;
};

type WorkoutPlanExercise = {
  Exercise: Exercise;
  order: number | null;
  sets: number;
  reps?: number;
  exerciseDuration?: number;
};

type WorkoutPlan = {
  id: string;
  name: string;
  description?: string;
  isSystemRoutine: boolean;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  notes: string | null;
  systemRoutineCategory: string | null;
};

type ExtendedWorkoutPlan = WorkoutPlan & {
  WorkoutPlanExercise: WorkoutPlanExercise[];
};

// Sample data
const sampleRoutines: ExtendedWorkoutPlan[] = [
  {
    id: "user-1",
    name: "My Upper Body Routine",
    description: "Custom upper body workout focusing on strength",
    isSystemRoutine: false,
    userId: "demo-user",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    notes: null,
    systemRoutineCategory: null,
    WorkoutPlanExercise: [
      {
        Exercise: { id: "ex-1", name: "Push-ups", category: "strength" },
        order: 1,
        sets: 3,
        reps: 12,
      },
      {
        Exercise: { id: "ex-2", name: "Pull-ups", category: "strength" },
        order: 2,
        sets: 3,
        reps: 8,
      },
      {
        Exercise: { id: "ex-3", name: "Shoulder Press", category: "strength" },
        order: 3,
        sets: 3,
        reps: 10,
      },
      {
        Exercise: { id: "ex-4", name: "Bicep Curls", category: "strength" },
        order: 4,
        sets: 3,
        reps: 12,
      },
    ],
  },
  {
    id: "user-2",
    name: "Quick Cardio Session",
    description: "High intensity cardio workout",
    isSystemRoutine: false,
    userId: "demo-user",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    notes: null,
    systemRoutineCategory: null,
    WorkoutPlanExercise: [
      {
        Exercise: { id: "ex-4", name: "Jumping Jacks", category: "cardio" },
        order: 1,
        sets: 4,
        exerciseDuration: 30,
      },
      {
        Exercise: { id: "ex-5", name: "Burpees", category: "cardio" },
        order: 2,
        sets: 3,
        reps: 10,
      },
      {
        Exercise: { id: "ex-6", name: "High Knees", category: "cardio" },
        order: 3,
        sets: 3,
        exerciseDuration: 45,
      },
    ],
  },
  {
    id: "system-1",
    name: "Beginner Full Body",
    description: "Perfect for beginners starting their fitness journey",
    isSystemRoutine: true,
    userId: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    notes: null,
    systemRoutineCategory: "beginner",
    WorkoutPlanExercise: [
      {
        Exercise: { id: "ex-7", name: "Bodyweight Squats", category: "strength" },
        order: 1,
        sets: 3,
        reps: 15,
      },
      {
        Exercise: { id: "ex-8", name: "Wall Push-ups", category: "strength" },
        order: 2,
        sets: 2,
        reps: 10,
      },
      {
        Exercise: { id: "ex-9", name: "Plank", category: "stretching" },
        order: 3,
        sets: 3,
        exerciseDuration: 30,
      },
      {
        Exercise: { id: "ex-10", name: "Lunges", category: "strength" },
        order: 4,
        sets: 2,
        reps: 12,
      },
    ],
  },
  {
    id: "system-2",
    name: "HIIT Fat Burner",
    description: "High intensity interval training for maximum calorie burn",
    isSystemRoutine: true,
    userId: null,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    notes: null,
    systemRoutineCategory: "hiit",
    WorkoutPlanExercise: [
      {
        Exercise: { id: "ex-10", name: "Mountain Climbers", category: "cardio" },
        order: 1,
        sets: 4,
        exerciseDuration: 45,
      },
      {
        Exercise: { id: "ex-11", name: "Jump Squats", category: "plyometrics" },
        order: 2,
        sets: 4,
        reps: 12,
      },
      {
        Exercise: { id: "ex-12", name: "Russian Twists", category: "strength" },
        order: 3,
        sets: 3,
        reps: 20,
      },
    ],
  },
];

type Color =
  | "default"
  | "success"
  | "secondary"
  | "warning"
  | "primary"
  | "danger";

// Category color mapping (matching your original)
const categoryColorMap: Record<string, Color> = {
  strength: "success",
  cardio: "secondary",
  stretching: "warning",
  plyometrics: "primary",
  strongman: "danger",
  powerlifting: "default",
  olympic_weightlifting: "secondary",
};

// Mock RoutineMenu component
const RoutineMenu = ({ routineId }: { routineId: string }) => (
  <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
    <IconDots size={16} className="text-zinc-500 dark:text-zinc-400" />
  </button>
);

// Individual Card Component (matching your exact structure)
const RoutineCard = ({ 
  routine, 
  isSystem, 
  activeWorkoutRoutine
}: {
  routine: ExtendedWorkoutPlan;
  isSystem: boolean;
  activeWorkoutRoutine: string | null;
}) => {
  const isAnotherWorkoutInProgress = activeWorkoutRoutine !== null && activeWorkoutRoutine !== routine.id;
  const isCurrentWorkout = activeWorkoutRoutine === routine.id;
  
  const uniqueCategories = new Set<string>();
  routine.WorkoutPlanExercise.forEach((exerciseDetail) => {
    uniqueCategories.add(exerciseDetail.Exercise.category);
  });

  const displayedExercises = routine.WorkoutPlanExercise
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <Card key={routine.id} shadow="none" className="shadow-md">
      <CardHeader className="flex gap-3 px-5 pt-4">
        <div className="flex flex-col flex-grow gap-[1px]">
          <p className="text-md font-[600] text-zinc-900 dark:text-white leading-5">
            {routine.name}
          </p>
          {!isSystem && (
            <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
              Updated: {format(new Date(routine.updatedAt), "MM/dd/yyyy")}
            </p>
          )}
        </div>
        {!isSystem && <RoutineMenu routineId={routine.id} />}
      </CardHeader>

      <CardBody className="pt-0 px-5">
        <ul className="text-sm border-l-[1px] border-zinc-600 pl-[12px]">
          {displayedExercises.map((exerciseDetail) => (
            <li
              key={exerciseDetail.Exercise.id}
              className="truncate text-zinc-500"
            >
              {exerciseDetail.sets && exerciseDetail.sets} x{" "}
              {exerciseDetail.Exercise.name}
            </li>
          ))}
        </ul>
      </CardBody>
      
      <CardFooter className="pt-0 px-5 pb-4 block">
        <Button
          variant="flat"
          as={Link}
          href="https://super-mosquito-26.accounts.dev/sign-in"
          size="sm"
          className="gap-unit-1 mt-[5px]"
          isDisabled={isAnotherWorkoutInProgress}
        >
          {isCurrentWorkout ? (
            <>
              <IconPlayerPlayFilled size={16} />
              Continue Workout
            </>
          ) : isAnotherWorkoutInProgress ? (
            "Another Workout is in Progress"
          ) : (
            <>
              <IconPlayerPlayFilled size={16} />
              Start Workout
            </>
          )}
        </Button>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {Array.from(uniqueCategories as Set<string>).map(
            (category: string, index: number) => (
              <Chip
                radius="sm"
                size="sm"
                className="capitalize"
                color={
                  categoryColorMap[category as keyof typeof categoryColorMap] ||
                  "default"
                }
                key={index}
              >
                {category}
              </Chip>
            ),
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

// Cards Container Component
const RoutineCards = ({ 
  routines, 
  isSystem 
}: {
  routines: ExtendedWorkoutPlan[];
  isSystem: boolean;
}) => {
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mb-3">
      {routines.map((routine) => (
        <RoutineCard
          key={routine.id}
          routine={routine}
          isSystem={isSystem}
          activeWorkoutRoutine={activeWorkoutRoutine}
        />
      ))}
    </div>
  );
};

// Page Heading Component
const PageHeading = ({ title }: { title: string }) => (
  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{title}</h1>
);

// Mock tour start function
const startTour = () => {
  console.log('Starting tour...');
};

// Main Page Component (matching your exact Next.js structure)
export default function WorkoutPage() {
  const userRoutines = sampleRoutines.filter(routine => !routine.isSystemRoutine);
  const systemRoutines = sampleRoutines.filter(routine => routine.isSystemRoutine);

  return (
    <div className="page-container">
      <div className="flex items-center justify-between mb-6" id="workout-header">
        <div id="workout-heading">
          <PageHeading title="Start Workout" />
        </div>
        <div className="flex gap-[10px] items-center">
          <button
            onClick={startTour}
            className="p-[5px] bg-zinc-800 text-white rounded-full hover:bg-zinc-700 w-10 h-10 flex items-center justify-center"
          >
            <IconWalk size={22} />
          </button>
          <Button
            as={Link}
            href="https://super-mosquito-26.accounts.dev/sign-in"
            color="primary"
            className="gap-unit-1"
            id="new-routine-button"
          >
            <IconPlus size={16} /> New Routine
          </Button>
        </div>
      </div>

      <div id="user-routines-section">
        <h2 className="font-semibold text-xl md:text-[22px] mb-5 mt-5">
          Your Routines
        </h2>
        {userRoutines.length > 0 ? (
          <RoutineCards routines={userRoutines} isSystem={false} />
        ) : (
          <p>
            No routines have been created.{" "}
            <Link
              className="text-danger dark:text-danger"
              href="https://super-mosquito-26.accounts.dev/sign-in"
            >
              Click here to create one
            </Link>
            .
          </p>
        )}
      </div>

      <div id="suggested-routines-section">
        <h3 className="font-semibold text-xl md:text-[22px] mb-5 mt-10">
          Suggested Routines
        </h3>
        <RoutineCards routines={systemRoutines} isSystem={true} />
      </div>
    </div>
  );
}