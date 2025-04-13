"use client";

import DashboardChartExerciseCategoryDistributionPieClient from "./DashboardChartExerciseCategoryDistributionPie.client";

// Dummy data for exercise categories
const dummyCategoryCounts = [
  { category: "strength", _count: { id: 5 } },
  { category: "stretching", _count: { id: 3 } },
  { category: "plyometrics", _count: { id: 4 } },
  { category: "strongman", _count: { id: 2 } },
  { category: "powerlifting", _count: { id: 6 } },
  { category: "cardio", _count: { id: 7 } },
  { category: "olympic weightlifting", _count: { id: 3 } },
];

type ExerciseCategoryData = {
  category: string;
  count: number;
};

const allCategories = [
  "strength",
  "stretching",
  "plyometrics",
  "strongman",
  "powerlifting",
  "cardio",
  "olympic weightlifting",
];

export default function DashboardChartExerciseCategoryDistribution({
  dateRange = "1W",
}: {
  dateRange?: string;
}) {
  // Assuming the date range isn't necessary for dummy data, we proceed with it as is.
  
  const minCount = 2;

  const radarChartData: ExerciseCategoryData[] = allCategories.map((category) => {
    const categoryData = dummyCategoryCounts.find((item) => item.category === category);
    return {
      category,
      count: categoryData ? Math.max(categoryData._count.id, minCount) : minCount,
    };
  });

  return <DashboardChartExerciseCategoryDistributionPieClient data={radarChartData} />;
}
