"use client";
import { handleUpdateUserMeasurements } from "@/server-actions/UserServerActions";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { IconRulerMeasure } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

interface UserMeasurements {
  birthdate?: Date | null;
  height?: number | null;
  weight?: number | null;
  fitnessGoals?: string | null;
  experienceLevel?: string | null;
  weeklySession?: number | null;
  sessionTime?: number | null;
}

const fitnessGoalOptions = [
  { value: "lose_weight", label: "Lose Weight" },
  { value: "gain_weight", label: "Gain Weight" },
  { value: "build_muscle", label: "Build Muscle" },
  { value: "maintain_fitness", label: "Maintain Fitness" },
  { value: "improve_endurance", label: "Improve Endurance" },
];

const experienceLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function ProfileMeasurements({
  userMeasurements,
}: {
  userMeasurements: UserMeasurements | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Format birthdate for date input
  const formatBirthdate = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  const [birthdate, setBirthdate] = useState(formatBirthdate(userMeasurements?.birthdate || null));
  const [height, setHeight] = useState(userMeasurements?.height?.toString() || "");
  const [weight, setWeight] = useState(userMeasurements?.weight?.toString() || "");
  const [fitnessGoals, setFitnessGoals] = useState(userMeasurements?.fitnessGoals || "");
  const [experienceLevel, setExperienceLevel] = useState(userMeasurements?.experienceLevel || "");
  const [weeklySession, setWeeklySession] = useState(userMeasurements?.weeklySession || 3);
  const [sessionTime, setSessionTime] = useState(userMeasurements?.sessionTime || 45);

  const handleSubmit = async () => {
    setIsLoading(true);

    // Calculate age from birthdate for server action
    const calculateAge = (birthdate: string) => {
      if (!birthdate) return "";
      const today = new Date();
      const birth = new Date(birthdate);
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age.toString();
    };

    const data = {
      age: calculateAge(birthdate),
      height: height.toString(),
      weight: weight.toString(),
    };

    const response = await handleUpdateUserMeasurements(data);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <Card shadow="none" className="shadow-md mb-3">
      <CardHeader className="text-xl font-semibold px-5 pb-0 gap-x-3 items-center">
        <IconRulerMeasure className="text-danger" />
        Measurements & Fitness Profile
      </CardHeader>
      <CardBody className="gap-y-3 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            type="number"
            label="Height (cm)"
            size="sm"
            placeholder="Enter your Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <Input
            type="number"
            label="Weight (kg)"
            size="sm"
            placeholder="Enter your Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <Input
          type="date"
          label="Birth Date"
          size="sm"
          placeholder="Enter your birth date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />

        <Select
          label="Fitness Goals"
          placeholder="Select your primary fitness goal"
          selectedKeys={fitnessGoals ? [fitnessGoals] : []}
          onSelectionChange={(keys) => setFitnessGoals(Array.from(keys)[0] as string)}
          className="w-full"
        >
          {fitnessGoalOptions.map((goal) => (
            <SelectItem key={goal.value} value={goal.value}>
              {goal.label}
            </SelectItem>
          ))}
        </Select>

        <Select
          label="Experience Level"
          placeholder="Select your fitness experience level"
          selectedKeys={experienceLevel ? [experienceLevel] : []}
          onSelectionChange={(keys) => setExperienceLevel(Array.from(keys)[0] as string)}
          className="w-full"
        >
          {experienceLevels.map((level) => (
            <SelectItem key={level.value} value={level.value}>
              {level.label}
            </SelectItem>
          ))}
        </Select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            type="number"
            label="Workout Days per Week"
            size="sm"
            placeholder="Days per week"
            value={weeklySession.toString()}
            onChange={(e) => setWeeklySession(Number(e.target.value) || 3)}
            min={1}
            max={7}
          />

          <Input
            type="number"
            label="Minutes per Session"
            size="sm"
            placeholder="Minutes per workout"
            value={sessionTime.toString()}
            onChange={(e) => setSessionTime(Number(e.target.value) || 45)}
            min={10}
            max={180}
          />
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your data is secure with us. We only use your information to enhance
          your user experience and never share it with third parties.
        </p>
      </CardBody>
      {/* <CardFooter className="px-5">
        <Button
          variant="flat"
          onPress={handleSubmit}
          isLoading={isLoading}
          startContent={<IconDeviceFloppy size={20} />}
        >
          Save
        </Button>
      </CardFooter> */}
    </Card>
  );
}