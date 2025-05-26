// DashboardChartWorkoutFrequency.tsx
import { endOfWeek, format, startOfWeek, subWeeks } from "date-fns";
import DashboardChartWorkoutFrequencyClient from "./DashboardChartWorkoutFrequency.client";

type WeeklyWorkoutData = {
  week: string;
  daysWorkedOut: number;
  startDate: string;
  endDate: string;
};

// Mock data for when no workout data exists
const mockData: WeeklyWorkoutData[] = [
  { week: 'Jan 7-13', daysWorkedOut: 2, startDate: '2025-01-07', endDate: '2025-01-13' },
  { week: 'Jan 14-20', daysWorkedOut: 3, startDate: '2025-01-14', endDate: '2025-01-20' },
  { week: 'Jan 21-27', daysWorkedOut: 1, startDate: '2025-01-21', endDate: '2025-01-27' },
  { week: 'Jan 28-Feb 3', daysWorkedOut: 4, startDate: '2025-01-28', endDate: '2025-02-03' },
  { week: 'Feb 4-10', daysWorkedOut: 2, startDate: '2025-02-04', endDate: '2025-02-10' },
  { week: 'Feb 11-17', daysWorkedOut: 5, startDate: '2025-02-11', endDate: '2025-02-17' },
  { week: 'Feb 18-24', daysWorkedOut: 3, startDate: '2025-02-18', endDate: '2025-02-24' },
  { week: 'Feb 25-Mar 3', daysWorkedOut: 4, startDate: '2025-02-25', endDate: '2025-03-03' },
  { week: 'Mar 4-10', daysWorkedOut: 2, startDate: '2025-03-04', endDate: '2025-03-10' },
  { week: 'Mar 11-17', daysWorkedOut: 5, startDate: '2025-03-11', endDate: '2025-03-17' },
  { week: 'Mar 18-24', daysWorkedOut: 4, startDate: '2025-03-18', endDate: '2025-03-24' },
  { week: 'Mar 25-31', daysWorkedOut: 3, startDate: '2025-03-25', endDate: '2025-03-31' },
  { week: 'Apr 1-7', daysWorkedOut: 5, startDate: '2025-04-01', endDate: '2025-04-07' },
  { week: 'Apr 8-14', daysWorkedOut: 2, startDate: '2025-04-08', endDate: '2025-04-14' },
];

// Demo data with recent dates (for May 2025)
const dummyWorkoutLogs = [
  { date: new Date(2025, 4, 1) }, // May 1, 2025
  { date: new Date(2025, 4, 3) }, // May 3, 2025
  { date: new Date(2025, 4, 5) }, // May 5, 2025
  { date: new Date(2025, 4, 7) }, // May 7, 2025
  { date: new Date(2025, 4, 8) }, // May 8, 2025
  { date: new Date(2025, 4, 11) }, // May 11, 2025
  { date: new Date(2025, 4, 12) }, // May 12, 2025
  { date: new Date(2025, 4, 14) }, // May 14, 2025
  { date: new Date(2025, 4, 15) }, // May 15, 2025
  { date: new Date(2025, 4, 16) }, // May 16, 2025
  { date: new Date(2025, 4, 19) }, // May 19, 2025
  { date: new Date(2025, 4, 20) }, // May 20, 2025
  // Previous months data
  { date: new Date(2025, 3, 2) }, // April 2, 2025
  { date: new Date(2025, 3, 5) }, // April 5, 2025
  { date: new Date(2025, 3, 7) }, // April 7, 2025
  { date: new Date(2025, 3, 9) }, // April 9, 2025
  { date: new Date(2025, 3, 14) }, // April 14, 2025
  { date: new Date(2025, 3, 16) }, // April 16, 2025
  { date: new Date(2025, 3, 21) }, // April 21, 2025
  { date: new Date(2025, 3, 23) }, // April 23, 2025
  { date: new Date(2025, 3, 28) }, // April 28, 2025
  { date: new Date(2025, 3, 30) }, // April 30, 2025
  { date: new Date(2025, 2, 4) }, // March 4, 2025
  { date: new Date(2025, 2, 7) }, // March 7, 2025
  { date: new Date(2025, 2, 11) }, // March 11, 2025
  { date: new Date(2025, 2, 14) }, // March 14, 2025
  { date: new Date(2025, 2, 19) }, // March 19, 2025
  { date: new Date(2025, 2, 21) }, // March 21, 2025
  { date: new Date(2025, 2, 25) }, // March 25, 2025
  { date: new Date(2025, 2, 28) }, // March 28, 2025
];

export default async function DashboardChartWorkoutFrequency() {
  // Simulating a logged in user with a dummy userId
  const userId = "demo-user-123";
  
  // Generate the last 12 weeks (3 months of data)
  const today = new Date();
  const weeks: Date[] = [];
  for (let i = 11; i >= 0; i--) {
    weeks.push(startOfWeek(subWeeks(today, i), { weekStartsOn: 1 })); // Start week on Monday
  }

  // Use our dummy workout logs instead of fetching from database
  const workoutLogs = dummyWorkoutLogs;
  
  // Uncomment the next line to test the mock data scenario (no workout data)
  // const workoutLogs = [];

  if (workoutLogs.length === 0) {
    // Return mock data if no records
    return <DashboardChartWorkoutFrequencyClient data={mockData} isUsingMockData />;
  }

  // Group workouts by week and count unique days
  const weeklyData: WeeklyWorkoutData[] = weeks.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    
    // Count unique days with workouts in this week
    const uniqueWorkoutDays = new Set();
    workoutLogs.forEach(log => {
      const logDate = log.date;
      if (logDate >= weekStart && logDate <= weekEnd) {
        // Use date string without time as the set key
        uniqueWorkoutDays.add(format(logDate, 'yyyy-MM-dd'));
      }
    });

    // Format week label with month and dates
    // Handle month transition in the week
    const monthStart = format(weekStart, 'MMM');
    const monthEnd = format(weekEnd, 'MMM');
    const weekLabel = monthStart === monthEnd 
      ? `${monthStart} ${format(weekStart, 'd')}-${format(weekEnd, 'd')}`
      : `${monthStart} ${format(weekStart, 'd')}-${monthEnd} ${format(weekEnd, 'd')}`;

    return {
      week: weekLabel,
      daysWorkedOut: uniqueWorkoutDays.size,
      startDate: format(weekStart, 'yyyy-MM-dd'),
      endDate: format(weekEnd, 'yyyy-MM-dd')
    };
  });

  return <DashboardChartWorkoutFrequencyClient data={weeklyData} />;
}