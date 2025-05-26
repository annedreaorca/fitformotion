"use client";
import { format, subDays, subMonths, subWeeks } from "date-fns";
import { useEffect, useState } from "react";
import DashboardAverageWorkoutTimeClient from "./DashboardAverageWorkoutTime.client";

type WorkoutData = {
  period: string;
  duration: number;
};

export default function DashboardAverageWorkoutTime({
  dateRange = "1W",
}: {
  dateRange?: string;
}) {
  const [chartData, setChartData] = useState<WorkoutData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateMockWorkoutData = () => {
      setIsLoading(true);
      
      // Generate appropriate number of data points based on dateRange
      const intervals = calculateIntervals(dateRange);
      const today = new Date();
      
      // Calculate workout data for each interval
      const generatedData: WorkoutData[] = intervals.map((intervalDate) => {
        // Format the date for display
        const period = format(intervalDate, "MM-dd-yyyy");
        
        // Generate realistic duration data (30-75 minutes)
        // Create a base pattern that increases slightly over time with some variation
        const daysSinceStart = Math.floor((today.getTime() - intervalDate.getTime()) / (1000 * 60 * 60 * 24));
        const baseDuration = 45; // Starting average of 45 minutes
        const trend = Math.min(15, daysSinceStart / 10); // Gradual improvement up to 15 minutes
        const randomVariation = Math.floor(Math.random() * 20) - 10; // -10 to +10 minute random variation
        
        // Combine base + trend + variation, ensuring duration is between 30-75 minutes
        const duration = Math.max(30, Math.min(75, Math.floor(baseDuration + trend + randomVariation)));
        
        return { period, duration };
      });
      
      // Sort by date (period)
      generatedData.sort((a, b) => {
        const dateA = new Date(a.period.split("-").join("/"));
        const dateB = new Date(b.period.split("-").join("/"));
        return dateA.getTime() - dateB.getTime();
      });
      
      setChartData(generatedData);
      setIsLoading(false);
    };
    
    generateMockWorkoutData();
    
    // Optional: refresh data periodically for demo purposes
    const intervalId = setInterval(generateMockWorkoutData, 60000);
    
    return () => clearInterval(intervalId);
  }, [dateRange]);
  
  if (isLoading) {
    return <div>Loading workout time data...</div>;
  }
  
  return <DashboardAverageWorkoutTimeClient data={chartData} />;
}

// Helper functions to calculate intervals based on date ranges
function calculateIntervals(dateRange: string): Date[] {
  const today = new Date();
  let intervals: Date[] = [];
  
  switch (dateRange) {
    case "1W": // 1 week - daily intervals
      for (let i = 6; i >= 0; i--) {
        intervals.push(subDays(today, i));
      }
      break;
    case "1M": // 1 month - weekly intervals
      for (let i = 0; i < 4; i++) {
        intervals.push(subWeeks(today, i));
      }
      break;
    case "3M": // 3 months - bi-weekly intervals
      for (let i = 0; i < 6; i++) {
        intervals.push(subDays(today, i * 14));
      }
      break;
    case "6M": // 6 months - monthly intervals
      for (let i = 0; i < 6; i++) {
        intervals.push(subMonths(today, i));
      }
      break;
    case "1Y": // 1 year - bi-monthly intervals
      for (let i = 0; i < 6; i++) {
        intervals.push(subMonths(today, i * 2));
      }
      break;
    case "ALL": // All time - quarterly intervals (last 2 years)
      for (let i = 0; i < 8; i++) {
        intervals.push(subMonths(today, i * 3));
      }
      break;
    default:
      // Default to 1 week
      for (let i = 6; i >= 0; i--) {
        intervals.push(subDays(today, i));
      }
  }
  
  return intervals;
}