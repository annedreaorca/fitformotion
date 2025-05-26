"use client";
import { IconHeartFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import DashboardCardTemplate from "./DashboardCardTemplate";

export default function DashboardCardMuscleDistribution() {
  const [topMuscle, setTopMuscle] = useState("No data yet");
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    // Simulate fetching data
    const generateMockData = () => {
      // Muscle groups commonly tracked in fitness apps
      const muscleGroups = [
        "chest",
        "back",
        "shoulders",
        "biceps",
        "triceps",
        "quadriceps",
        "hamstrings",
        "calves",
        "abdominals",
        "forearms",
        "glutes",
        "trapezius",
        "lats"
      ];
      
      // Simulate having workout data (80% chance)
      const hasWorkoutData = Math.random() > 0.2;
      
      if (!hasWorkoutData) {
        setHasData(false);
        setTopMuscle("No data yet");
        return;
      }
      
      // Mock muscle frequency data with proper type definition
      const mockMuscleCounts: Record<string, number> = {};
      
      // Generate 15-30 random exercise records
      const exerciseCount = Math.floor(Math.random() * 16) + 15;
      
      for (let i = 0; i < exerciseCount; i++) {
        // Select 1-2 random primary muscles
        const primaryCount = Math.floor(Math.random() * 2) + 1;
        for (let p = 0; p < primaryCount; p++) {
          const muscle = muscleGroups[Math.floor(Math.random() * muscleGroups.length)];
          mockMuscleCounts[muscle] = (mockMuscleCounts[muscle] || 0) + 2; // Primary gets weight of 2
        }
        
        // Select 0-3 random secondary muscles
        const secondaryCount = Math.floor(Math.random() * 4);
        for (let s = 0; s < secondaryCount; s++) {
          const muscle = muscleGroups[Math.floor(Math.random() * muscleGroups.length)];
          mockMuscleCounts[muscle] = (mockMuscleCounts[muscle] || 0) + 1; // Secondary gets weight of 1
        }
      }
      
      // Find the most worked muscle group
      let topMuscle = "chest"; // Default in case the random data is empty
      let topCount = 0;
      
      Object.entries(mockMuscleCounts).forEach(([muscle, count]) => {
        if (count > topCount) {
          topMuscle = muscle;
          topCount = count;
        }
      });
      
      // Format the muscle name for display
      const displayMuscle = topMuscle.replace(/_/g, ' ');
      const capitalizedMuscle = displayMuscle.charAt(0).toUpperCase() + displayMuscle.slice(1);
      
      setTopMuscle(capitalizedMuscle);
      setHasData(true);
    };
    
    generateMockData();
    
    // Optional: Refresh mock data periodically for demo purposes
    const intervalId = setInterval(generateMockData, 45000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <DashboardCardTemplate
      title="Top Muscle Group"
      icon={<IconHeartFilled className="text-primary" />}
    >
      <div>
        <span className="text-lg font-medium">{topMuscle}</span>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Based on your workouts
        </div>
      </div>
    </DashboardCardTemplate>
  );
}