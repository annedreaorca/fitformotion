// C:\Users\anned\Desktop\fitformotion\app\(protected)\dashboard\_components\DashboardGoals\DashboardGoals.tsx
import { Progress } from "@nextui-org/progress";
import { IconTarget } from "@tabler/icons-react";
import Link from "next/link";
// import CreateDashboardGoal from "./CreateDashboardGoal";
import DashboardGoalTemplate from "./DashboardGoalTemplate";

type ExerciseWithIdAndName = {
  id: string;
  name: string;
};

type UserGoal = {
  id: string;
  userId: string;
  exerciseId: string;
  goalValue: number;
  createdAt: Date;
  updatedAt: Date;
};

type GoalWithProgress = {
  progress?: number;
  bestValue?: number;
  Exercise: ExerciseWithIdAndName;
} & UserGoal;

// Dummy data for demo purposes
const dummyGoals: GoalWithProgress[] = [
  {
    id: "goal-1",
    userId: "demo-user-123",
    exerciseId: "ex-1",
    goalValue: 100,
    createdAt: new Date("2025-04-10"),
    updatedAt: new Date("2025-04-10"),
    progress: 0.85,
    bestValue: 85,
    Exercise: {
      id: "ex-1",
      name: "Bench Press"
    }
  },
  {
    id: "goal-2",
    userId: "demo-user-123",
    exerciseId: "ex-2",
    goalValue: 150,
    createdAt: new Date("2025-04-12"),
    updatedAt: new Date("2025-04-12"),
    progress: 0.6,
    bestValue: 90,
    Exercise: {
      id: "ex-2",
      name: "Squat"
    }
  },
  {
    id: "goal-3",
    userId: "demo-user-123",
    exerciseId: "ex-3",
    goalValue: 200,
    createdAt: new Date("2025-04-15"),
    updatedAt: new Date("2025-04-15"),
    progress: 1.0,
    bestValue: 205,
    Exercise: {
      id: "ex-3",
      name: "Deadlift"
    }
  },
  {
    id: "goal-4",
    userId: "demo-user-123",
    exerciseId: "ex-4",
    goalValue: 50,
    createdAt: new Date("2025-04-18"),
    updatedAt: new Date("2025-04-18"),
    progress: 0.4,
    bestValue: 20,
    Exercise: {
      id: "ex-4",
      name: "Pull-up"
    }
  },
  {
    id: "goal-5",
    userId: "demo-user-123",
    exerciseId: "ex-5",
    goalValue: 70,
    createdAt: new Date("2025-04-20"),
    updatedAt: new Date("2025-04-20"),
    progress: 0.93,
    bestValue: 65,
    Exercise: {
      id: "ex-5",
      name: "Barbell Row"
    }
  }
];

export default async function DashboardGoals({
  isAdvancedView = false
}: {
  isAdvancedView?: boolean;
}) {
  // Simulating a logged in user with a dummy userId
  const userId = "demo-user-123";
  
  // Use our dummy goals for the demo
  const goals = dummyGoals;
  
  // In advanced view, show all goals. In beginner view, show a limited number.
  const displayGoals = isAdvancedView ? goals : goals.slice(0, 4);
  const maxGoals = isAdvancedView ? 8 : 4;

  return (
    <>
      <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 mb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Your Goals</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {displayGoals.map((goal, index) => (
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
              <Progress
                aria-label="Goal Progress"
                value={(goal.progress || 0) * 100}
                color={
                  (goal.progress || 0) > 0.9 
                    ? "success" 
                    : (goal.progress || 0) > 0.5 
                      ? "primary" 
                      : "default"
                }
                showValueLabel={true}
                classNames={{
                  label: "text-xs"
                }}
              />
              
              <div className="text-xs mt-2 text-gray-500">
                {goal.progress && goal.progress >= 1 
                  ? "Goal achieved!" 
                  : `${Math.round((goal.progress || 0) * 100)}% complete`}
              </div>
              
              {!isAdvancedView && goal.progress && goal.progress < 1 && (
                <div className="text-xs mt-1 text-primary">
                  {Math.round((goal.goalValue - (goal.bestValue || 0)) * 10) / 10} more to reach your goal
                </div>
              )}
            </DashboardGoalTemplate>
          ))}

          {displayGoals.length < maxGoals && (
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
              {/* <CreateDashboardGoal /> */}
            </DashboardGoalTemplate>
          )}
        </div>
      </div>
    </>
  );
}