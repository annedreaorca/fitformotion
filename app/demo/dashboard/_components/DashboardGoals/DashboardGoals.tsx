"use client";

import { Progress } from "@nextui-org/progress";
import { IconTarget, IconTargetArrow } from "@tabler/icons-react";
import Link from "next/link";
// import CreateDashboardGoal from "./CreateDashboardGoal";
import { Button } from "@nextui-org/button";
import DashboardGoalTemplate from "./DashboardGoalTemplate";

// Type for exercise data with ID and name
type ExerciseWithIdAndName = {
  id: string;
  name: string;
};

// Type for goal with progress
type GoalWithProgress = {
  progress?: number;
  bestValue?: number;
  Exercise: ExerciseWithIdAndName;
  goalValue: number;
  id: string;
};

// Dummy data for goals
const generateMockGoals = (): GoalWithProgress[] => {
  const mockGoals: GoalWithProgress[] = [
    {
      id: "goal-1",
      progress: Math.random(), // Random progress for demo
      bestValue: Math.floor(Math.random() * 100),
      goalValue: 100,
      Exercise: { id: "exercise-1", name: "Push Up" },
    },
    {
      id: "goal-2",
      progress: Math.random(),
      bestValue: Math.floor(Math.random() * 100),
      goalValue: 120,
      Exercise: { id: "exercise-2", name: "Squat" },
    },
    {
      id: "goal-3",
      progress: Math.random(),
      bestValue: Math.floor(Math.random() * 100),
      goalValue: 150,
      Exercise: { id: "exercise-3", name: "Deadlift" },
    },
  ];
  return mockGoals;
};

export default function DashboardGoals() {
  // Use the generated mock data
  const goals = generateMockGoals();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 mb-3">
      {goals.map((goal, index) => (
        <DashboardGoalTemplate
          key={goal.id}
          title={`Goal ${index + 1}`}
          icon={<IconTarget className="text-primary" />}
          showSettings
          id={goal.id}
        >
          <div className="text-sm truncate mb-3">{goal.Exercise.name}</div>
          <div className="flex justify-between mb-3">
            <div className="text-sm">
              Best: <span className="text-danger">{goal.bestValue}</span>
            </div>
            <div className="text-sm">
              Target:{" "}
              <span className="text-black dark:text-primary">
                {goal.goalValue}
              </span>
            </div>
          </div>
          <Progress aria-label="Goal Progress" value={(goal.progress || 0) * 100} />
        </DashboardGoalTemplate>
      ))}

      {goals.length < 4 && (
        <DashboardGoalTemplate
          title="Add New Goal"
          icon={<IconTarget className="text-primary" />}
        >
          <p className="text-sm mb-3 leading-none text-zinc-600 dark:text-zinc-400">
            Select a{" "}
            <Link href="/exercises" className="text-danger dark:text-primary">
              favorite exercise
            </Link>{" "}
            to track
          </p>
          <Button variant="flat" className="absolute bottom-5 left-3">
            <IconTargetArrow className="text-primary" /> Set Goal
          </Button>
          {/* <CreateDashboardGoal /> */}
        </DashboardGoalTemplate>
      )}
    </div>
  );
}
