"use client";
import { IconHourglass } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import DashboardCardTemplate from "./DashboardCardTemplate";

export default function DashboardCardAverageWorkoutDuration() {
  // Use state to manage the average duration
  const [averageDuration, setAverageDuration] = useState(0);
  
  useEffect(() => {
    // Simulate data fetching
    const fetchWorkoutData = () => {
      // Mock workout data - randomly generate between 10-15 workout durations
      const mockWorkouts = Array.from({ length: Math.floor(Math.random() * 6) + 10 }, () => ({
        duration: Math.floor(Math.random() * 90) + 30, // Random duration between 30-120 minutes
      }));
      
      // Calculate average duration from mock data
      const totalDuration = mockWorkouts.reduce((total, workout) => {
        return total + workout.duration;
      }, 0);
      
      const calculatedAverage = 
        mockWorkouts.length > 0 ? Math.round(totalDuration / mockWorkouts.length) : 0;
      
      setAverageDuration(calculatedAverage);
    };
    
    fetchWorkoutData();
    
    // Optional: Simulate refresh of data every 30 seconds for demo purposes
    const intervalId = setInterval(fetchWorkoutData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

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