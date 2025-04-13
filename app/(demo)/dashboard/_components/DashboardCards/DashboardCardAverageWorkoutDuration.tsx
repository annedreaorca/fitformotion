"use client";

import { IconHourglass } from "@tabler/icons-react";
import { subDays } from "date-fns";
import DashboardCardTemplate from "./DashboardCardTemplate";

// Dummy data: 10 workouts over the past 30 days
const dummyWorkouts = [
  { duration: 45 }, // in minutes
  { duration: 60 },
  { duration: 30 },
  { duration: 50 },
  { duration: 70 },
  { duration: 40 },
  { duration: 65 },
  { duration: 55 },
  { duration: 35 },
  { duration: 50 },
];

export default function DashboardCardAverageWorkoutDuration() {
  const thirtyDaysAgo = subDays(new Date(), 30);

  // Simulate filtering data that happened within the last 30 days
  const recentWorkouts = dummyWorkouts; // you can add `createdAt` in dummy data if you want date filtering

  const totalDuration = recentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const averageDuration =
    recentWorkouts.length > 0
      ? Math.round(totalDuration / recentWorkouts.length)
      : 0;

  return (
    <DashboardCardTemplate
      title="Avg Workout Time"
      icon={<IconHourglass className="text-primary" />}
    >
      <div className="flex gap-3 items-end">
        <span>{averageDuration}</span>
        <p className="text-[16px] mb-[-5px] text-zinc-400">minute/s</p>
      </div>
    </DashboardCardTemplate>
  );
}
