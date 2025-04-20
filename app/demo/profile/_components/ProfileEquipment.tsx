"use client";
import { EquipmentType, handleUpdateUserEquipment } from "@/server-actions/UserServerActions";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Checkbox, CheckboxGroup } from "@nextui-org/checkbox";
import { IconBarbell, IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileEquipmentProps {
  equipment: string[];
}

const equipmentItems = [
  "barbell",
  "cable",
  "dumbbell",
  "ez_curl_bar",
  "machine",
];

const formatText = (text: string): string => {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function toEquipmentType(items: string[]): EquipmentType[] {
  // Check if each item is a valid EquipmentType
  return items.filter((item): item is EquipmentType =>
    equipmentItems.includes(item as string)
  ) as EquipmentType[];
}

export default function ProfileEquipment({ equipment }: ProfileEquipmentProps) {
  const [selectedEquipment, setSelectedEquipment] = useState(equipment || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const response = await handleUpdateUserEquipment(
      toEquipmentType(selectedEquipment),
    );

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="text-xl font-semibold px-5 pb-0 gap-x-3 items-center">
        <IconBarbell className="text-danger" />
        Equipments
      </CardHeader>
      <CardBody className="px-5">
        <CheckboxGroup
          value={selectedEquipment}
          onChange={(value) => setSelectedEquipment(value as string[])}
          color="primary"
        >
          {equipmentItems.map((item, index) => (
            <Checkbox key={index} value={item}>
              {formatText(item)}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </CardBody>
      <CardFooter className="px-5">
        <Button
          variant="flat"
          onPress={handleSubmit}
          isLoading={isLoading}
          startContent={<IconDeviceFloppy size={20} />}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}