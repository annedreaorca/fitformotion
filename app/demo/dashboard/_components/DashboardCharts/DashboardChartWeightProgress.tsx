// C:\Users\anned\Desktop\fitformotion\app\(protected)\dashboard\_components\DashboardCharts\DashboardChartWeightProgress.tsx
import { format, subDays } from "date-fns";
import DashboardChartWeightProgressClient from "./DashboardChartWeightProgress.client";
import {
  calculateIntervals,
  getIntervalStartAndEndDates,
} from "./utils/dateUtils";

type UserWeightData = {
  period: string;
  totalWeight: number;
};

// Static dummy data for demo purposes
const dummyWeightData: UserWeightData[] = [
  { period: '05-14-2025', totalWeight: 182 },
  { period: '05-15-2025', totalWeight: 180 },
  { period: '05-16-2025', totalWeight: 178 },
  { period: '05-17-2025', totalWeight: 177 },
  { period: '05-18-2025', totalWeight: 175 },
  { period: '05-19-2025', totalWeight: 174 },
  { period: '05-20-2025', totalWeight: 173 },
];

// Mock data for when no weight data exists
const mockData: UserWeightData[] = [
  { period: '01-14-2024', totalWeight: 180 },
  { period: '01-15-2024', totalWeight: 175 },
  { period: '01-16-2024', totalWeight: 170 },
  { period: '01-17-2024', totalWeight: 165 },
  { period: '01-18-2024', totalWeight: 160 },
  { period: '01-19-2024', totalWeight: 155 },
  { period: '01-20-2024', totalWeight: 150 },
];

export default async function DashboardChartUserWeight({
  dateRange = "1W",
}: {
  dateRange?: string;
}) {
  // Simulating a logged in user with a dummy userId
  const userId = "demo-user-123";
  
  // Demo mode: Always use our dummy data instead of fetching from database
  const userWeights = getDummyUserWeights();
  
  // Simulating the case where we have no weight data
  // Uncomment the next line to test the mock data scenario
  // const userWeights = [];
  
  if (userWeights.length === 0) {
    // Use the static mock data if no user weight data exists
    return <DashboardChartWeightProgressClient data={mockData} isUsingMockData />;
  }
  
  // Prepare data for the chart by mapping userWeights
  const totalWeights: UserWeightData[] = userWeights.map((entry) => ({
    period: format(entry.recordedAt, "MM-dd-yyyy"), // Format the date
    totalWeight: entry.weight || 0, // Set totalWeight to the recorded weight
  }));
  
  // Prepare data for the chart based on intervals
  const intervals = calculateIntervals(dateRange);
  const adjustedData = intervals.map((interval) => {
    const { startOfInterval, endOfInterval } = getIntervalStartAndEndDates(
      interval,
      dateRange,
    );
    const period = format(startOfInterval, "MM-dd-yyyy");
    
    // Filter totalWeights to get those within the current interval
    let weightsUpToInterval = totalWeights.filter((item) => {
      const itemDate = new Date(item.period);
      return itemDate <= endOfInterval;
    });
    
    // Get the last recorded weight in the interval
    let lastTotalWeight =
      weightsUpToInterval.length > 0
        ? weightsUpToInterval[weightsUpToInterval.length - 1].totalWeight
        : 0;
    
    return {
      period,
      totalWeight: lastTotalWeight, // Return the total weight for the period
    };
  });
  
  return <DashboardChartWeightProgressClient data={adjustedData} />;
}

// Helper function that returns dummy user weight data
function getDummyUserWeights() {
  // Create dummy weight entries for the last 7 days
  const today = new Date();
  
  return dummyWeightData.map((entry, index) => {
    return {
      recordedAt: subDays(today, 6 - index), // Last 7 days
      weight: entry.totalWeight,
    };
  });
}