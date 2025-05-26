import DashboardChartExerciseMuscleDistributionClient from "./DashboardChartExerciseMuscleDistribution.client";
import { calculateIntervals } from "./utils/dateUtils";

type ExerciseMuscleData = {
  muscle: string;
  count: number;
};

// Mock data to display as default
const mockData: ExerciseMuscleData[] = [
  { muscle: "abdominals", count: 14 },
  { muscle: "hamstrings", count: 8 },
  { muscle: "adductors", count: 4 },
  { muscle: "quadriceps", count: 12 },
  { muscle: "biceps", count: 10 },
  { muscle: "shoulders", count: 15 },
  { muscle: "chest", count: 18 },
  { muscle: "middle back", count: 7 },
  { muscle: "calves", count: 6 },
  { muscle: "glutes", count: 9 },
  { muscle: "lower back", count: 5 },
  { muscle: "lats", count: 11 },
  { muscle: "triceps", count: 13 },
  { muscle: "traps", count: 8 },
  { muscle: "forearms", count: 4 },
  { muscle: "neck", count: 2 },
  { muscle: "abductors", count: 3 }
];

// Dummy workout data to simulate database
const dummyWorkoutLogs = [
  {
    id: 1,
    exercises: [
      { exerciseId: "ex1" },
      { exerciseId: "ex2" },
      { exerciseId: "ex3" }
    ]
  },
  {
    id: 2,
    exercises: [
      { exerciseId: "ex4" },
      { exerciseId: "ex2" },
      { exerciseId: "ex5" }
    ]
  },
  {
    id: 3,
    exercises: [
      { exerciseId: "ex6" },
      { exerciseId: "ex3" },
      { exerciseId: "ex7" }
    ]
  }
];

// Dummy exercise data to simulate database
const dummyExercises = {
  "ex1": { primary_muscles: ["chest", "triceps"], secondary_muscles: ["shoulders"] },
  "ex2": { primary_muscles: ["biceps"], secondary_muscles: ["forearms"] },
  "ex3": { primary_muscles: ["quadriceps"], secondary_muscles: ["glutes", "calves"] },
  "ex4": { primary_muscles: ["lats", "middle_back"], secondary_muscles: ["biceps"] },
  "ex5": { primary_muscles: ["shoulders"], secondary_muscles: ["triceps"] },
  "ex6": { primary_muscles: ["abdominals"], secondary_muscles: ["lower_back"] },
  "ex7": { primary_muscles: ["hamstrings"], secondary_muscles: ["glutes", "lower_back"] }
};

export default function DashboardChartExerciseMuscleDistribution({
  dateRange = "1W",
  useMockData = false
}: {
  dateRange?: string;
  useMockData?: boolean;
}) {
  // If useMockData is true, just return the mock data
  if (useMockData) {
    return <DashboardChartExerciseMuscleDistributionClient data={mockData} isUsingMockData={true} />;
  }

  const minCount = 2;
  const intervals = calculateIntervals(dateRange);
  
  // Extract all exercise IDs from the dummy workout logs
  const exerciseIds = dummyWorkoutLogs.flatMap(log => 
    log.exercises.map(exercise => exercise.exerciseId)
  );

  // Count frequency of each muscle group
  const muscleCounts: Record<string, number> = {};
  
  // Process all exercises to count muscle usage
  exerciseIds.forEach(id => {
    const exercise = dummyExercises[id as keyof typeof dummyExercises];
    if (exercise) {
      // Primary muscles count more than secondary
      exercise.primary_muscles.forEach(muscle => {
        muscleCounts[muscle] = (muscleCounts[muscle] || 0) + 2; // Primary muscle gets weight of 2
      });
      
      exercise.secondary_muscles.forEach(muscle => {
        muscleCounts[muscle] = (muscleCounts[muscle] || 0) + 1; // Secondary muscle gets weight of 1
      });
    }
  });

  // Get all possible muscle values
  const allMuscles = [
    "abdominals",
    "hamstrings",
    "adductors",
    "quadriceps",
    "biceps",
    "shoulders",
    "chest",
    "middle_back",
    "calves",
    "glutes",
    "lower_back",
    "lats",
    "triceps",
    "traps",
    "forearms",
    "abductors"
  ];

  // Format data for the radar chart
  const radarChartData: ExerciseMuscleData[] = allMuscles.map(muscle => {
    // Map the DB enum values to display names
    const displayMuscle = muscle.replace(/_/g, ' ');
    
    return {
      muscle: displayMuscle,
      count: muscleCounts[muscle] || minCount,
    };
  });

  // You can choose to return either the generated data or mock data
  return (
    <DashboardChartExerciseMuscleDistributionClient data={radarChartData} />
  );
}