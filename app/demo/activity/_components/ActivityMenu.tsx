"use client";
import { ActivityModalContext } from "@/contexts/ActivityModalContext";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  IconInfoCircle,
  IconMenu2,
  IconShare,
  IconTrash
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "sonner";

// Replace Prisma enum with custom type
type TrackingType = "WEIGHT_REPS" | "DURATION" | "DISTANCE" | "REPS_ONLY";

interface Set {
  weight: number | null;
  reps: number | null;
  exerciseDuration: number | null;
}

interface Exercise {
  id: string;
  exerciseId: string;
  trackingType: TrackingType;
  Exercise: {
    name: string;
  };
  sets: Set[];
}

interface WorkoutPlan {
  name: string;
}

interface Activity {
  id: string;
  duration: number;
  date: string | Date;
  WorkoutPlan: WorkoutPlan;
  exercises: Exercise[];
}

export default function ActivityMenu({ activity }: { activity: Activity }) {
  const router = useRouter();
  const { setActivity, onOpen } = useContext(ActivityModalContext);

  const handleDelete = async (activityId: string) => {
    try {
      // For demo mode, we can optionally skip the server action
      // and just show a success message directly
      const demoMode = true;
      
      if (demoMode) {
        // Demo mode - just simulate success
        setTimeout(() => {
          toast.success("Activity deleted successfully (Demo)");
        }, 500);
        return;
      }
    
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Failed to delete activity");
    }
  };

  const handleAction = (key: string, activity: Activity) => {
    if (key === "delete") {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this activity?",
      );
      if (confirmDelete) {
        handleDelete(activity.id);
      }
    } else if (key === "details") {
      setActivity(activity);
      onOpen();
    } else if (key === "edit") {
      router.push("/activity/" + activity.id);
    } else if (key === "share") {
      toast.info("Sharing feature coming soon!");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="shrink-0">
          <IconMenu2
            className="text-black dark:text-primary"
            size={22}
            aria-label="Activity actions"
          />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        color="primary"
        disabledKeys={["share"]}
        aria-label="Activity Actions"
        topContent={
          <h4 className="text-zinc-500 uppercase font-semibold text-xs px-2 pt-2 pb-2">
            Activity Actions
          </h4>
        }
        onAction={(key) => handleAction(String(key), activity)}
      >
        <DropdownSection showDivider>
          <DropdownItem
            startContent={<IconInfoCircle size={20} />}
            key="details"
          >
            View Details
          </DropdownItem>
          {/* <DropdownItem startContent={<IconEdit size={20} />} key="edit">
            Edit
          </DropdownItem> */}
          <DropdownItem startContent={<IconShare size={20} />} key="share">
            Share (Coming Soon)
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          startContent={<IconTrash size={20} />}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Delete Activity
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}