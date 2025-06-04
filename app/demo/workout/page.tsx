"use client";
import { startTour } from "@/components/TourGuide/StartWorkoutGuide";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { IconDots, IconMail, IconPlayerPlayFilled, IconPlus, IconUser, IconWalk } from "@tabler/icons-react";
import { useState } from 'react';

// Helper function to format date (replacing date-fns)
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

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

// Category color mapping
const categoryColorMap: Record<string, Color> = {
  strength: "success",
  cardio: "secondary",
  stretching: "warning",
  plyometrics: "primary",
  strongman: "danger",
  powerlifting: "default",
  olympic_weightlifting: "secondary",
};

// Registration Prompt Modal Component
const RegisterPromptModal = ({ 
  isOpen, 
  onClose, 
  actionType 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  actionType: 'workout' | 'create';
}) => {
  const getContent = () => {
    if (actionType === 'workout') {
      return {
        title: "Ready to Start Your Workout?",
        subtitle: "Create your free account to track your progress and save your workouts!",
        benefits: [
          "Track your workout progress",
          "Save and create custom routines",
          "Monitor your fitness goals",
          "Access workout history"
        ]
      };
    } else {
      return {
        title: "Create Your Own Routine",
        subtitle: "Join thousands of users building personalized workout routines!",
        benefits: [
          "Build custom workout routines",
          "Choose from 500+ exercises",
          "Set personalized goals",
          "Track your improvements"
        ]
      };
    }
  };

  const content = getContent();

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="md"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900/50 to-zinc-900/10 backdrop-blur-sm",
        base: "border-[1px] border-zinc-200 dark:border-zinc-700",
        header: "border-b-[1px] border-zinc-200 dark:border-zinc-700",
        footer: "border-t-[1px] border-zinc-200 dark:border-zinc-700",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
            <IconUser size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            {content.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">
            {content.subtitle}
          </p>
        </ModalHeader>
        
        <ModalBody className="py-4">
          <div className="space-y-3">
            {content.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0"></div>
                <span className="text-zinc-700 dark:text-zinc-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              <strong className="text-zinc-900 dark:text-white">100% Free</strong> • No credit card required • Get started in 30 seconds
            </p>
          </div>
        </ModalBody>
        
        <ModalFooter className="flex flex-col gap-2 pt-2">
          <Button
            color="primary"
            size="lg"
            className="w-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            startContent={<IconMail size={18} />}
            as="a"
            href="https://app.fitformotion.com"
            target="_blank"
          >
            Sign Up Free
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-zinc-600 dark:text-zinc-400"
            onPress={onClose}
          >
            Maybe Later
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Mock RoutineMenu component
const RoutineMenu = ({ routineId }: { routineId: string }) => (
  <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
    <IconDots size={16} className="text-zinc-500 dark:text-zinc-400" />
  </button>
);

// Individual Card Component
const RoutineCard = ({ 
  routine, 
  isSystem, 
  activeWorkoutRoutine,
  onWorkoutStart
}: {
  routine: ExtendedWorkoutPlan;
  isSystem: boolean;
  activeWorkoutRoutine: string | null;
  onWorkoutStart: () => void;
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
              Updated: {formatDate(new Date(routine.updatedAt))}
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
          size="sm"
          className="gap-unit-1 mt-[5px]"
          isDisabled={isAnotherWorkoutInProgress}
          onPress={onWorkoutStart}
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
        
        {/* <div className="flex flex-wrap gap-1 mt-3">
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
        </div> */}
      </CardFooter>
    </Card>
  );
};

// Cards Container Component
const RoutineCards = ({ 
  routines, 
  isSystem,
  onWorkoutStart
}: {
  routines: ExtendedWorkoutPlan[];
  isSystem: boolean;
  onWorkoutStart: () => void;
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
          onWorkoutStart={onWorkoutStart}
        />
      ))}
    </div>
  );
};

// Page Heading Component
const PageHeading = ({ title }: { title: string }) => (
  <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{title}</h1>
);


// Main Page Component
export default function WorkoutPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState<'workout' | 'create'>('workout');

  const userRoutines = sampleRoutines.filter(routine => !routine.isSystemRoutine);
  const systemRoutines = sampleRoutines.filter(routine => routine.isSystemRoutine);

  const handleWorkoutStart = () => {
    setModalActionType('workout');
    setIsRegisterModalOpen(true);
  };

  const handleCreateRoutine = () => {
    setModalActionType('create');
    setIsRegisterModalOpen(true);
  };

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
            color="primary"
            className="gap-unit-1"
            id="new-routine-button"
            onPress={handleCreateRoutine}
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
          <RoutineCards 
            routines={userRoutines} 
            isSystem={false} 
            onWorkoutStart={handleWorkoutStart}
          />
        ) : (
          <p>
            No routines have been created.{" "}
            <button
              className="text-danger dark:text-danger underline"
              onClick={handleCreateRoutine}
            >
              Click here to create one
            </button>
            .
          </p>
        )}
      </div>

      <div id="suggested-routines-section">
        <h3 className="font-semibold text-xl md:text-[22px] mb-5 mt-10">
          Suggested Routines
        </h3>
        <RoutineCards 
          routines={systemRoutines} 
          isSystem={true} 
          onWorkoutStart={handleWorkoutStart}
        />
      </div>

      <RegisterPromptModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        actionType={modalActionType}
      />
    </div>
  );
}