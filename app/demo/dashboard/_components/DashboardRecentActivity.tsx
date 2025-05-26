// C:\Users\anned\Desktop\fitformotion\app\(protected)\dashboard\_components\DashboardRecentActivity.tsx
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { format } from "date-fns";
import Link from "next/link";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}

// Dummy activity data for demo purposes
const dummyRecentActivity = [
  {
    id: "workout-1",
    duration: 3600, // 60 minutes
    createdAt: new Date("2025-05-19T10:30:00"),
    WorkoutPlan: {
      name: "Full Body Strength",
    },
    exercises: [
      {
        id: "ex-1-1",
        Exercise: {
          name: "Bench Press",
        },
        sets: [
          { weight: 80, reps: 10, exerciseDuration: 60 },
          { weight: 85, reps: 8, exerciseDuration: 60 },
          { weight: 90, reps: 6, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-1-2",
        Exercise: {
          name: "Squat",
        },
        sets: [
          { weight: 100, reps: 10, exerciseDuration: 60 },
          { weight: 110, reps: 8, exerciseDuration: 60 },
          { weight: 120, reps: 6, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-1-3",
        Exercise: {
          name: "Pull-up",
        },
        sets: [
          { weight: 0, reps: 10, exerciseDuration: 60 },
          { weight: 0, reps: 8, exerciseDuration: 60 },
          { weight: 0, reps: 6, exerciseDuration: 60 },
        ],
      },
    ],
  },
  {
    id: "workout-2",
    duration: 2700, // 45 minutes
    createdAt: new Date("2025-05-17T17:15:00"),
    WorkoutPlan: {
      name: "Upper Body Focus",
    },
    exercises: [
      {
        id: "ex-2-1",
        Exercise: {
          name: "Overhead Press",
        },
        sets: [
          { weight: 50, reps: 12, exerciseDuration: 60 },
          { weight: 55, reps: 10, exerciseDuration: 60 },
          { weight: 60, reps: 8, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-2-2",
        Exercise: {
          name: "Barbell Row",
        },
        sets: [
          { weight: 70, reps: 12, exerciseDuration: 60 },
          { weight: 75, reps: 10, exerciseDuration: 60 },
          { weight: 80, reps: 8, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-2-3",
        Exercise: {
          name: "Tricep Extension",
        },
        sets: [
          { weight: 15, reps: 15, exerciseDuration: 60 },
          { weight: 17.5, reps: 12, exerciseDuration: 60 },
          { weight: 20, reps: 10, exerciseDuration: 60 },
        ],
      },
    ],
  },
  {
    id: "workout-3",
    duration: 3300, // 55 minutes
    createdAt: new Date("2025-05-15T09:00:00"),
    WorkoutPlan: {
      name: "Lower Body Power",
    },
    exercises: [
      {
        id: "ex-3-1",
        Exercise: {
          name: "Deadlift",
        },
        sets: [
          { weight: 120, reps: 8, exerciseDuration: 60 },
          { weight: 130, reps: 6, exerciseDuration: 60 },
          { weight: 140, reps: 4, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-3-2",
        Exercise: {
          name: "Leg Press",
        },
        sets: [
          { weight: 150, reps: 12, exerciseDuration: 60 },
          { weight: 160, reps: 10, exerciseDuration: 60 },
          { weight: 170, reps: 8, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-3-3",
        Exercise: {
          name: "Calf Raise",
        },
        sets: [
          { weight: 100, reps: 15, exerciseDuration: 60 },
          { weight: 100, reps: 15, exerciseDuration: 60 },
          { weight: 100, reps: 15, exerciseDuration: 60 },
        ],
      },
    ],
  },
  {
    id: "workout-4",
    duration: 1800, // 30 minutes
    createdAt: new Date("2025-05-12T18:30:00"),
    WorkoutPlan: {
      name: "HIIT Training",
    },
    exercises: [
      {
        id: "ex-4-1",
        Exercise: {
          name: "Burpees",
        },
        sets: [
          { weight: 0, reps: 20, exerciseDuration: 60 },
          { weight: 0, reps: 18, exerciseDuration: 60 },
          { weight: 0, reps: 15, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-4-2",
        Exercise: {
          name: "Kettlebell Swing",
        },
        sets: [
          { weight: 20, reps: 20, exerciseDuration: 60 },
          { weight: 20, reps: 20, exerciseDuration: 60 },
          { weight: 20, reps: 20, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-4-3",
        Exercise: {
          name: "Mountain Climbers",
        },
        sets: [
          { weight: 0, reps: 30, exerciseDuration: 60 },
          { weight: 0, reps: 30, exerciseDuration: 60 },
          { weight: 0, reps: 30, exerciseDuration: 60 },
        ],
      },
    ],
  },
  {
    id: "workout-5",
    duration: 3900, // 65 minutes
    createdAt: new Date("2025-05-10T11:00:00"),
    WorkoutPlan: {
      name: "Push Day",
    },
    exercises: [
      {
        id: "ex-5-1",
        Exercise: {
          name: "Incline Bench Press",
        },
        sets: [
          { weight: 70, reps: 12, exerciseDuration: 60 },
          { weight: 75, reps: 10, exerciseDuration: 60 },
          { weight: 80, reps: 8, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-5-2",
        Exercise: {
          name: "Shoulder Press",
        },
        sets: [
          { weight: 50, reps: 12, exerciseDuration: 60 },
          { weight: 55, reps: 10, exerciseDuration: 60 },
          { weight: 60, reps: 8, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-5-3",
        Exercise: {
          name: "Chest Fly",
        },
        sets: [
          { weight: 15, reps: 15, exerciseDuration: 60 },
          { weight: 17.5, reps: 12, exerciseDuration: 60 },
          { weight: 20, reps: 10, exerciseDuration: 60 },
        ],
      },
    ],
  },
  {
    id: "workout-6",
    duration: 3600, // 60 minutes
    createdAt: new Date("2025-05-08T16:00:00"),
    WorkoutPlan: {
      name: "Pull Day",
    },
    exercises: [
      {
        id: "ex-6-1",
        Exercise: {
          name: "Lat Pulldown",
        },
        sets: [
          { weight: 60, reps: 12, exerciseDuration: 60 },
          { weight: 65, reps: 10, exerciseDuration: 60 },
          { weight: 70, reps: 8, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-6-2",
        Exercise: {
          name: "Face Pull",
        },
        sets: [
          { weight: 25, reps: 15, exerciseDuration: 60 },
          { weight: 30, reps: 12, exerciseDuration: 60 },
          { weight: 35, reps: 10, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-6-3",
        Exercise: {
          name: "Bicep Curl",
        },
        sets: [
          { weight: 15, reps: 12, exerciseDuration: 60 },
          { weight: 17.5, reps: 10, exerciseDuration: 60 },
          { weight: 20, reps: 8, exerciseDuration: 60 },
        ],
      },
    ],
  },
  {
    id: "workout-7",
    duration: 2700, // 45 minutes
    createdAt: new Date("2025-05-06T07:30:00"),
    WorkoutPlan: {
      name: "Leg Day",
    },
    exercises: [
      {
        id: "ex-7-1",
        Exercise: {
          name: "Front Squat",
        },
        sets: [
          { weight: 80, reps: 10, exerciseDuration: 60 },
          { weight: 85, reps: 8, exerciseDuration: 60 },
          { weight: 90, reps: 6, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-7-2",
        Exercise: {
          name: "Romanian Deadlift",
        },
        sets: [
          { weight: 100, reps: 12, exerciseDuration: 60 },
          { weight: 110, reps: 10, exerciseDuration: 60 },
          { weight: 120, reps: 8, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-7-3",
        Exercise: {
          name: "Leg Extension",
        },
        sets: [
          { weight: 50, reps: 15, exerciseDuration: 60 },
          { weight: 55, reps: 12, exerciseDuration: 60 },
          { weight: 60, reps: 10, exerciseDuration: 60 },
        ],
      },
    ],
  },
  {
    id: "workout-8",
    duration: 3000, // 50 minutes
    createdAt: new Date("2025-05-04T14:15:00"),
    WorkoutPlan: {
      name: "Core Focus",
    },
    exercises: [
      {
        id: "ex-8-1",
        Exercise: {
          name: "Ab Crunch",
        },
        sets: [
          { weight: 0, reps: 20, exerciseDuration: 60 },
          { weight: 0, reps: 20, exerciseDuration: 60 },
          { weight: 0, reps: 20, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-8-2",
        Exercise: {
          name: "Plank",
        },
        sets: [
          { weight: 0, reps: 1, exerciseDuration: 60 },
          { weight: 0, reps: 1, exerciseDuration: 60 },
          { weight: 0, reps: 1, exerciseDuration: 60 },
        ],
      },
      {
        id: "ex-8-3",
        Exercise: {
          name: "Russian Twist",
        },
        sets: [
          { weight: 10, reps: 20, exerciseDuration: 60 },
          { weight: 10, reps: 20, exerciseDuration: 60 },
          { weight: 10, reps: 20, exerciseDuration: 60 },
        ],
      },
    ],
  },
];

export default async function DashboardRecentActivity({
  isAdvancedView = false
}: {
  isAdvancedView?: boolean;
}) {
  // Simulating a logged in user with a dummy userId
  const userId = "demo-user-123";
  
  // In advanced view, show more recent activity items
  const takeLimit = isAdvancedView ? 8 : 4;

  // Use our dummy activity data for the demo
  const recentActivity = dummyRecentActivity.slice(0, takeLimit);

  return (
    <>
      {recentActivity.length > 0 && (
        <>
          <h2 className="mb-3 mt-2 text-lg">Recent Activity</h2>
          <div className={`grid grid-cols-1 md:grid-cols-1 ${isAdvancedView ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} gap-3 mb-5`}>
            {recentActivity.map((activity) => {
              const totalWeight = activity.exercises.reduce(
                (total, exercise) => {
                  const exerciseWeight = exercise.sets.reduce(
                    (total, set) => total + (set.weight || 0),
                    0,
                  );
                  return total + exerciseWeight;
                },
                0,
              );

              return (
                <Card key={activity.id} shadow="none" className="shadow-md">
                  <CardHeader className="flex gap-3 px-5 pt-4">
                    <div className="flex flex-col flex-grow">
                      <p className="text-md text-black dark:text-primary leading-5">
                        {activity.WorkoutPlan.name}
                      </p>
                      <p className="text-xs text-default-500 leading-5">
                        <span className="flex space-x-1">
                          <time>
                            {format(new Date(activity.createdAt), "MM/dd/yyyy")}
                          </time>
                          <span className="text-zinc-500">|</span>
                          <span>{formatDuration(activity.duration)}</span>
                          <span className="text-zinc-500">|</span>
                          <span>{totalWeight} KG</span>
                        </span>
                      </p>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0 px-5 pb-4">
                    <ul>
                      {activity.exercises.map((exercise) => (
                        <li
                          key={exercise.id}
                          className="flex gap-1 justify-between text-sm"
                        >
                          <p className="grow truncate">
                            {exercise.Exercise.name}
                          </p>
                          <p className="shrink-0">
                            {exercise.sets.length} Sets
                          </p>
                        </li>
                      ))}
                    </ul>
                    
                    {isAdvancedView && (
                      <div className="mt-3">
                        <Link href={`/activity/${activity.id}`} className="text-sm text-primary hover:underline">
                          View Details
                        </Link>
                      </div>
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>
          <div className="flex justify-center">
            <Button as={Link} href="/activity">
              View all activity
            </Button>
          </div>
        </>
      )}
    </>
  );
}