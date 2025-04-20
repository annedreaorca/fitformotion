"use client";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { startTour } from "@/components/TourGuide/ProfileGuide";
import { Button } from "@nextui-org/react";
import { IconLogout, IconWalk } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ProfileDetails from "./_components/ProfileDetails";
import ProfileEquipment from "./_components/ProfileEquipment";
import ProfileHero from "./_components/ProfileHero";
import ProfileMeasurements from "./_components/ProfileMeasurements";
import ProfileStats from "./_components/ProfileStats";

// Define types for our data
type UserMeasurements = {
  age: number;
  height: number;
  weight: number;
} | null;

// Mock user data for demo
const getDummyUserData = () => {
  return {
    id: "user_123456789",
    username: "demouser",
    firstName: "Demo",
    lastName: "User",
    imageUrl: "https://via.placeholder.com/150",
  };
};

// Mock measurements data for demo
const getDummyMeasurements = () => {
  return {
    age: 28,
    height: 175,
    weight: 70,
  };
};

// Mock equipment data for demo
const getDummyEquipment = () => {
  return [
    { equipmentType: "barbell" },
    { equipmentType: "dumbbell" },
  ];
};

export default function ProfilePage() {
  // Client state to store all our data
  const [userData, setUserData] = useState({
    user: {
      id: "",
      username: "",
      firstName: "",
      lastName: "",
      imageUrl: "",
    },
    measurements: null as UserMeasurements,
    equipment: [] as string[],
  });
 
  const [loading, setLoading] = useState(true);

  // Use useEffect to load data on component mount
  useEffect(() => {
    // Load all our dummy data
    const user = getDummyUserData();
    const measurements = getDummyMeasurements();
    const equipmentObjects = getDummyEquipment();
    const equipment = equipmentObjects.map(obj => obj.equipmentType);
   
    // Set all data
    setUserData({
      user,
      measurements,
      equipment
    });
   
    setLoading(false);
  }, []);
 
  // Show loading state while data is loading
  if (loading) {
    return <div>Loading...</div>;
  }
  const { user, measurements, equipment } = userData;
 
  return (
    <>
      <div className="flex items-center justify-end mb-6">
        <button
          onClick={startTour}
          className="p-[5px] bg-zinc-800 text-white rounded-full hover:bg-zinc-700 w-10 h-10 flex items-center justify-center"
        >
          <IconWalk size={22} />
        </button>
      </div>
      <div id="profile-hero">
        <ProfileHero
          userImage={user.imageUrl}
          username={user.username}
        />
      </div>
      {measurements && (
        <div id="profile-stats">
          <ProfileStats userMeasurements={measurements} />
        </div>
      )}
      <div id="theme-switcher" className="flex justify-center py-2 mb-3">
        <ThemeSwitcher />
      </div>
      <div id="profile-details">
        <ProfileDetails
          username={user.username}
          firstName={user.firstName}
          lastName={user.lastName}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
        <div id="profile-measurements">
          <ProfileMeasurements userMeasurements={measurements} />
        </div>
        <div id="profile-equipment">
          <ProfileEquipment equipment={equipment} />
        </div>
      </div>
      <div id="profile-actions">
        <Button variant="flat" disabled>
          <IconLogout /> Sign out
        </Button>
      </div>
    </>
  );
}