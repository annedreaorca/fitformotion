"use client";
import { IconWeight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import DashboardCardTemplate from "./DashboardCardTemplate";

export default function DashboardCardWeightProgress() {
  const [weight, setWeight] = useState<number | string>("No weight input yet");
  const [recordedDate, setRecordedDate] = useState<string>("No recorded data yet");

  useEffect(() => {
    const generateMockWeightData = () => {
      // 90% chance of having weight data, 10% chance of showing "No weight input yet"
      const hasWeightData = Math.random() > 0.1;
      
      if (!hasWeightData) {
        setWeight("No weight input yet");
        setRecordedDate("No recorded data yet");
        return;
      }
      
      // Generate realistic weight data (65-95 kg with one decimal place)
      const mockWeight = (Math.random() * 30 + 65).toFixed(1);
      
      // Generate a recent date (between today and 14 days ago)
      const today = new Date();
      const daysAgo = Math.floor(Math.random() * 14); // 0-14 days ago
      const recordDate = new Date(today);
      recordDate.setDate(today.getDate() - daysAgo);
      
      // Format the date
      const formattedDate = recordDate.toLocaleDateString();
      
      setWeight(parseFloat(mockWeight));
      setRecordedDate(formattedDate);
    };
    
    // Generate initial data
    generateMockWeightData();
    
    // Optional: Set up timer to refresh data periodically for demo purposes
    const intervalId = setInterval(generateMockWeightData, 50000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Format the weight display
  const weightDisplay = typeof weight === "number" ? `${weight} kg` : weight;

  return (
    <DashboardCardTemplate
      title="Current Weight"
      icon={<IconWeight className="text-primary" />}
    >
      <div>
        <span className="text-lg font-medium">{weightDisplay}</span>
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
          Last recorded: {recordedDate}
        </div>
      </div>
    </DashboardCardTemplate>
  );
}