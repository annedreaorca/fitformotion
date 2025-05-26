"use client";
import { IconCalendarWeek } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import DashboardCardTemplate from "./DashboardCardTemplate";

export default function DashboardCardWeeklyWorkouts() {
  const [workoutCount, setWorkoutCount] = useState<number>(0);

  useEffect(() => {
    // Function to generate realistic mock workout data
    const generateMockWorkoutCount = () => {
      // Most active users work out 3-5 times a week
      // Less active might do 1-2
      // Highly active might do 6-7
      // We'll weight it towards the middle
      
      const userActivityLevel = Math.random(); // Random number between 0 and 1
      
      let weeklyWorkouts: number;
      
      if (userActivityLevel < 0.15) {
        // Less active user (15% chance)
        weeklyWorkouts = Math.floor(Math.random() * 2) + 1; // 1-2 workouts
      } else if (userActivityLevel < 0.85) {
        // Average active user (70% chance)
        weeklyWorkouts = Math.floor(Math.random() * 3) + 3; // 3-5 workouts
      } else {
        // Highly active user (15% chance)
        weeklyWorkouts = Math.floor(Math.random() * 2) + 6; // 6-7 workouts
      }
      
      setWorkoutCount(weeklyWorkouts);
    };
    
    // Generate initial data
    generateMockWorkoutCount();
    
    // Optionally, set up a timer to refresh data periodically for demo purposes
    const intervalId = setInterval(generateMockWorkoutCount, 40000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DashboardCardTemplate
      title="Weekly Workouts"
      icon={<IconCalendarWeek className="text-primary" />}
    >
      {workoutCount}
    </DashboardCardTemplate>
  );
}