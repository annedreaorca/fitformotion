"use client";

import { format, subDays } from "date-fns";
import DashboardChartProgressOverTimeClient from "./DashboardChartProgressOverTime.client";

// Type for chart data
type WorkoutData = {
  period: string;
  totalWeight: number;
};

// Generate random cumulative progress data
const generateMockData = (): WorkoutData[] => {
  const data: WorkoutData[] = [];
  const today = new Date();
  let cumulativeWeight = 0;

  for (let i = 9; i >= 0; i--) {
    const date = subDays(today, i);
    const dailyWeight = Math.floor(Math.random() * 50 + 100); // Random daily lift
    cumulativeWeight += dailyWeight;

    data.push({
      period: format(date, "MM-dd-yyyy"),
      totalWeight: cumulativeWeight,
    });
  }

  return data;
};

export default function DashboardChartProgressOverTime({
  dateRange = "1W",
}: {
  dateRange?: string;
}) {
  const mockData = generateMockData();

  return (
    <DashboardChartProgressOverTimeClient
      data={mockData}
      isUsingMockData
    />
  );
}
