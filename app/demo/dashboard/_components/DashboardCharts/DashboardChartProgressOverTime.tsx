import { format, subDays } from "date-fns";
import DashboardChartProgressOverTimeClient from "./DashboardChartProgressOverTime.client";
import {
  calculateIntervals,
  getIntervalStartAndEndDates,
} from "./utils/dateUtils";

type WorkoutData = {
  period: string;
  totalWeight: number;
};

// Mock data for when no workout data is available
const mockData: WorkoutData[] = [
  { period: '01-01-2024', totalWeight: 100 },
  { period: '02-01-2024', totalWeight: 140 },
  { period: '03-01-2024', totalWeight: 120 },
  { period: '04-01-2024', totalWeight: 160 },
  { period: '05-01-2024', totalWeight: 150 },
  { period: '06-01-2024', totalWeight: 170 },
  { period: '07-01-2024', totalWeight: 160 },
  { period: '08-01-2024', totalWeight: 180 },
  { period: '09-01-2024', totalWeight: 170 },
  { period: '10-01-2024', totalWeight: 190 },
];

// Dummy workout data to simulate database
const dummyWorkoutLogs = [
  {
    date: subDays(new Date(), 30),
    exercises: [
      { sets: [{ weight: 50 }, { weight: 60 }, { weight: 70 }] },
      { sets: [{ weight: 30 }, { weight: 30 }, { weight: 30 }] }
    ]
  },
  {
    date: subDays(new Date(), 26),
    exercises: [
      { sets: [{ weight: 55 }, { weight: 65 }, { weight: 75 }] },
      { sets: [{ weight: 35 }, { weight: 35 }, { weight: 35 }] }
    ]
  },
  {
    date: subDays(new Date(), 23),
    exercises: [
      { sets: [{ weight: 60 }, { weight: 70 }, { weight: 80 }] },
      { sets: [{ weight: 40 }, { weight: 40 }, { weight: 40 }] }
    ]
  },
  {
    date: subDays(new Date(), 19),
    exercises: [
      { sets: [{ weight: 65 }, { weight: 75 }, { weight: 85 }] },
      { sets: [{ weight: 45 }, { weight: 45 }, { weight: 45 }] }
    ]
  },
  {
    date: subDays(new Date(), 16),
    exercises: [
      { sets: [{ weight: 70 }, { weight: 80 }, { weight: 90 }] },
      { sets: [{ weight: 50 }, { weight: 50 }, { weight: 50 }] }
    ]
  },
  {
    date: subDays(new Date(), 12),
    exercises: [
      { sets: [{ weight: 75 }, { weight: 85 }, { weight: 95 }] },
      { sets: [{ weight: 55 }, { weight: 55 }, { weight: 55 }] }
    ]
  },
  {
    date: subDays(new Date(), 9),
    exercises: [
      { sets: [{ weight: 80 }, { weight: 90 }, { weight: 100 }] },
      { sets: [{ weight: 60 }, { weight: 60 }, { weight: 60 }] }
    ]
  },
  {
    date: subDays(new Date(), 5),
    exercises: [
      { sets: [{ weight: 85 }, { weight: 95 }, { weight: 105 }] },
      { sets: [{ weight: 65 }, { weight: 65 }, { weight: 65 }] }
    ]
  },
  {
    date: subDays(new Date(), 2),
    exercises: [
      { sets: [{ weight: 90 }, { weight: 100 }, { weight: 110 }] },
      { sets: [{ weight: 70 }, { weight: 70 }, { weight: 70 }] }
    ]
  }
];

export default function DashboardChartProgressOverTime({
  dateRange = "1W",
  useMockData = false
}: {
  dateRange?: string;
  useMockData?: boolean;
}) {
  // If useMockData is true, just return the mock data
  if (useMockData) {
    return <DashboardChartProgressOverTimeClient data={mockData} isUsingMockData={true} />;
  }

  const intervals = calculateIntervals(dateRange);
  
  // Find earliest workout date to establish our starting point
  const workoutDates = dummyWorkoutLogs.map(log => log.date);
  const startDate = workoutDates.length > 0 
    ? new Date(Math.min(...workoutDates.map(date => date.getTime())))
    : new Date();

  // Filter workout logs based on date range
  const filteredWorkoutLogs = dummyWorkoutLogs.filter(log => 
    log.date >= startDate && log.date <= new Date()
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  if (filteredWorkoutLogs.length === 0) {
    return <DashboardChartProgressOverTimeClient data={mockData} isUsingMockData={true} />;
  }

  let cumulativeTotalWeight = 0;

  let cumulativeWeights = filteredWorkoutLogs.map((log) => {
    const totalWeightForLog = log.exercises.reduce(
      (total, exercise) =>
        total +
        exercise.sets.reduce(
          (setTotal, set) => setTotal + (set.weight || 0),
          0,
        ),
      0,
    );
    cumulativeTotalWeight += totalWeightForLog;
    return {
      period: format(log.date, "yyyy-MM-dd"),
      totalWeight: cumulativeTotalWeight,
    };
  });

  const adjustedData = intervals.map((interval) => {
    const { startOfInterval, endOfInterval } = getIntervalStartAndEndDates(
      interval,
      dateRange,
    );
    const period = format(startOfInterval, "MM-dd-yyyy");

    let cumulativeWeightsUpToInterval = cumulativeWeights.filter((item) => {
      const itemDate = new Date(item.period);
      return itemDate <= endOfInterval;
    });

    let lastCumulativeWeight =
      cumulativeWeightsUpToInterval.length > 0
        ? cumulativeWeightsUpToInterval[
            cumulativeWeightsUpToInterval.length - 1
          ].totalWeight
        : 0;

    return {
      period,
      totalWeight: lastCumulativeWeight,
    };
  });

  return <DashboardChartProgressOverTimeClient data={adjustedData} />;
}