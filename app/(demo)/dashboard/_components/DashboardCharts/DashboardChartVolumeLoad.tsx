"use client";

import { format, subDays } from "date-fns";
import DashboardChartVolumeLoadClient from "./DashboardChartVolumeLoad.client";

// Type for workout volume load data
type WorkoutVolumeLoadData = {
  period: string;
  totalVolumeLoad: number;
};

// Generate mock data for the previous 7 days
const generateMockData = (): WorkoutVolumeLoadData[] => {
  const mockData: WorkoutVolumeLoadData[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i); // Get the date for the past week
    mockData.push({
      period: format(date, "MM-dd-yyyy"), // Format the date
      totalVolumeLoad: Math.floor(Math.random() * 1000), // Random volume load data
    });
  }

  return mockData;
};

export default function DashboardChartVolumeLoad({
  dateRange = "1W",
}: {
  dateRange?: string;
}) {
  // Use the generated mock data for the previous 7 days
  const mockData = generateMockData();
  
  return <DashboardChartVolumeLoadClient data={mockData} isUsingMockData />;
}
