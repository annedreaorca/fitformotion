"use server";
import { revalidatePath } from "next/cache";

// For demo purposes, we'll simulate storage with a mock
// In a real application without Prisma, you might use another database solution or localStorage
let mockActivities: string[] = ["1", "2", "3"]; // Mock IDs for demonstration

export async function handleDeleteActivity(activityId: string) {
  try {
    // Simulate authentication check
    const isAuthenticated = true; // In demo mode, always consider user authenticated
    
    if (!isAuthenticated) {
      throw new Error("You must be signed in to delete activities.");
    }

    // Simulate database operation - remove activity from our mock array
    mockActivities = mockActivities.filter(id => id !== activityId);
    
    // This would usually update your database
    console.log(`Activity ${activityId} deleted from mock storage`);
    console.log("Remaining activities:", mockActivities);
    
    // Revalidate the activity page to refresh the data
    revalidatePath("/activity");
    
    return { success: true, message: "Activity deleted successfully" };
  } catch (e) {
    console.error("Error deleting activity:", e);
    return { success: false, message: "Failed to delete activity" };
  }
}

// For demo purposes, we can add a helper function to handle activity data
export async function fetchActivities() {
  // In a real application, this would fetch from your database
  // For demo, just return the mock data
  return mockActivities;
}

// Optional: Add functionality to reset demo state
export async function resetDemoActivities() {
  mockActivities = ["1", "2", "3"];
  revalidatePath("/activity");
  return { success: true, message: "Demo activities reset" };
}