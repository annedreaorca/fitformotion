"use client";
import { revalidatePath } from "next/cache";

// Define types for better TypeScript support
export type EquipmentType = 
  | "barbell"
  | "cable"
  | "dumbbell"
  | "ez_curl_bar"
  | "machine";

// Mock user data for demo
const dummyUser = {
  id: "user_123456789",
  username: "demouser",
  firstName: "Demo",
  lastName: "User",
  imageUrl: "https://via.placeholder.com/150",
};

// Mock measurements
const dummyMeasurements = {
  age: 28,
  height: 175,
  weight: 70,
};

// Mock equipment
const dummyEquipment: { userId: string; equipmentType: EquipmentType }[] = [
  { userId: "user_123456789", equipmentType: "barbell" },
  { userId: "user_123456789", equipmentType: "dumbbell" },
];

// Mock goals
const dummyGoals = [
  { 
    id: "goal1", 
    userId: "user_123456789", 
    exerciseId: "ex1", 
    goalType: "WEIGHT", 
    goalValue: 100 
  }
];

export async function handleUpdateUserDetails(data: {
  username: string;
  firstName: string;
  lastName: string;
}) {
  try {
    // Instead of updating Clerk user, just log the data that would be updated
    console.log("Updating user details:", data);
    
    // In a real app, this would update the user in the database
    // For demo, we'll just pretend it worked
    revalidatePath("/profile");
    return { success: true, message: "User info updated" };
  } catch (e) {
    console.error("Error updating user details:", e);
    return { success: false, message: "Failed to update user info" };
  }
}

export async function handleUpdateUserMeasurements(data: {
  age: string;
  height: string;
  weight: string;
}) {
  const parsedData = {
    age: data.age ? parseInt(data.age, 10) : null,
    height: data.height ? parseFloat(data.height) : null,
    weight: data.weight ? parseFloat(data.weight) : null,
  };

  try {
    // Instead of using Prisma, just log the data that would be updated
    console.log("Updating user measurements:", parsedData);
    
    // Update our dummy measurements (in a real app this would update the DB)
    Object.assign(dummyMeasurements, parsedData);
    
    revalidatePath("/profile");
    return { success: true, message: "User info updated" };
  } catch (e) {
    console.error("Error updating measurements:", e);
    return { success: false, message: "Failed to update user info" };
  }
}

export async function handleUpdateUserEquipment(
  selectedEquipment: EquipmentType[],
) {
  try {
    // Instead of using Prisma, just log the equipment that would be updated
    console.log("Updating user equipment:", selectedEquipment);
    
    // In a real app, this would update the database
    // For demo purposes, we can update our dummy equipment array
    const userId = "user_123456789"; // Hardcoded ID for demo
    
    // Clear existing equipment
    dummyEquipment.length = 0;
    
    // Add new equipment
    for (let item of selectedEquipment) {
      dummyEquipment.push({
        userId: userId,
        equipmentType: item
      });
    }
    
    revalidatePath("/profile");
    return { success: true, message: "User equipment updated" };
  } catch (e) {
    console.error("Error updating equipment:", e);
    return { success: false, message: "Failed to update user equipment" };
  }
}

export async function handleCreateUserGoal(data: {
  exerciseId: string;
  goalValue: number;
}) {
  try {
    // Instead of using Prisma, just log the goal that would be created
    console.log("Creating user goal:", data);
    
    // In a real app, this would insert into the database
    // For demo purposes, we can add to our dummy goals array
    const newGoal = {
      id: `goal${Date.now()}`, // Generate a unique ID
      userId: "user_123456789", // Hardcoded ID for demo
      exerciseId: data.exerciseId,
      goalType: "WEIGHT",
      goalValue: data.goalValue
    };
    
    dummyGoals.push(newGoal);
    
    revalidatePath("/dashboard");
    return { success: true, message: "New goal created" };
  } catch (e) {
    console.error("Error creating goal:", e);
    return { success: false, message: "Failed to add goal" };
  }
}

export async function handleDeleteUserGoal(id: string) {
  try {
    // Instead of using Prisma, just log the goal ID that would be deleted
    console.log("Deleting user goal with ID:", id);
    
    // In a real app, this would delete from the database
    // For demo purposes, we can remove from our dummy goals array
    const goalIndex = dummyGoals.findIndex(goal => goal.id === id);
    if (goalIndex !== -1) {
      dummyGoals.splice(goalIndex, 1);
    }
    
    revalidatePath("/dashboard");
    return { success: true, message: "Goal deleted" };
  } catch (e) {
    console.error("Error deleting goal:", e);
    return { success: false, message: "Failed to delete goal" };
  }
}