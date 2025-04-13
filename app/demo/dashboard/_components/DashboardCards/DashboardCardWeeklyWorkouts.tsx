"use client";

import { IconCalendarWeek } from "@tabler/icons-react";
import DashboardCardTemplate from "./DashboardCardTemplate";

// Dummy workout logs from the past 7 days
const dummyWorkoutLogs = [
  { createdAt: new Date("2025-04-12") }, // today
  { createdAt: new Date("2025-04-11") }, // yesterday
  { createdAt: new Date("2025-04-09") },
  { createdAt: new Date("2025-04-07") },
];

export default function DashboardCardWeeklyWorkouts() {
  // Filter the workouts to include only those in the last 7 days
  const last7DaysWorkouts = dummyWorkoutLogs.filter(workout => {
    const sevenDaysAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    return workout.createdAt >= sevenDaysAgo;
  });

  return (
    <DashboardCardTemplate
      title="Weekly Workouts"
      icon={<IconCalendarWeek className="text-primary" />}
    >
      {last7DaysWorkouts.length}
    </DashboardCardTemplate>
  );
}
