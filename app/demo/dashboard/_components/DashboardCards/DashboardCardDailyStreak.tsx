"use client";

import { IconFlame } from "@tabler/icons-react";
import { differenceInCalendarDays } from "date-fns";
import DashboardCardTemplate from "./DashboardCardTemplate";

// Dummy workout logs sorted from most recent to oldest
const dummyWorkoutLogs = [
  { createdAt: new Date("2025-04-12") }, // today
  { createdAt: new Date("2025-04-11") }, // yesterday
  { createdAt: new Date("2025-04-10") },
  { createdAt: new Date("2025-04-08") }, // skip a day
  { createdAt: new Date("2025-04-07") },
];

export default function DashboardCardDailyStreak() {
  let streak = 1; // Start from 1 assuming today is a workout day

  for (let i = 0; i < dummyWorkoutLogs.length - 1; i++) {
    const diff = differenceInCalendarDays(
      dummyWorkoutLogs[i].createdAt,
      dummyWorkoutLogs[i + 1].createdAt
    );

    if (diff === 1) {
      streak++;
    } else if (diff > 1) {
      break;
    }
  }

  return (
    <DashboardCardTemplate
      title="Daily Streak"
      icon={<IconFlame className="text-primary" />}
    >
      {streak}
    </DashboardCardTemplate>
  );
}
