import { format } from "date-fns";
import DashboardChartWorkoutFrequencyClient from "./DashboardChartWorkoutFrequency.client";
import {
  calculateIntervals,
  getIntervalStartAndEndDates,
} from "./utils/dateUtils";

type WorkoutFrequencyData = {
  period: string;
  workouts: number;
};

const mockData: WorkoutFrequencyData[] = [
  { period: '01-01-2024', workouts: 1 },
  { period: '02-01-2024', workouts: 3 },
  { period: '03-01-2024', workouts: 2 },
  { period: '04-01-2024', workouts: 4 },
  { period: '05-01-2024', workouts: 3 },
  { period: '06-01-2024', workouts: 5 },
  { period: '07-01-2024', workouts: 4 },
  { period: '08-01-2024', workouts: 6 },
  { period: '09-01-2024', workouts: 5 },
  { period: '10-01-2024', workouts: 7 },
];

export default function DashboardChartWorkoutFrequencyDemo({
  dateRange = "1W",
}: {
  dateRange?: string;
}) {
  const intervals = calculateIntervals(dateRange);

  const workoutsPerInterval = intervals.map(
    (interval): WorkoutFrequencyData => {
      const { startOfInterval, endOfInterval } = getIntervalStartAndEndDates(
        interval,
        dateRange,
      );

      // Find mock data entries that would fall within this interval
      const workoutsInInterval = mockData.filter((log) => {
        const [month, day, year] = log.period.split('-').map(Number);
        const logDate = new Date(year, month - 1, day);
        return logDate >= startOfInterval && logDate <= endOfInterval;
      });

      return {
        period: format(startOfInterval, "MM-dd-yyyy"),
        workouts: workoutsInInterval.length,
      };
    },
  );

  return <DashboardChartWorkoutFrequencyClient data={workoutsPerInterval} isUsingMockData={true} />;
}