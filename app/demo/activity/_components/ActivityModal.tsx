"use client";
import { ActivityModalContext } from "@/contexts/ActivityModalContext";
import FormatDuration from "@/utils/FormatDuration";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { format } from "date-fns";
import { useContext } from "react";

export default function ActivityModal() {
  const { activity, isOpen, onOpenChange } = useContext(ActivityModalContext);

  // Add null check for activity to prevent rendering errors
  if (!activity && isOpen) {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Loading activity details...</ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="3xl"
      isKeyboardDismissDisabled
      scrollBehavior="outside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex-col gap-1 pb-0">
              <h2 className="flex gap-1">
                <time>
                  {activity ? format(new Date(activity.date), "MM/dd/yyyy") : ""}
                </time>
                <span>-</span>
                <span>{activity?.WorkoutPlan?.name}</span>
              </h2>

              <p className="text-sm">
                <FormatDuration seconds={activity?.duration || 0} />
              </p>
            </ModalHeader>
            <ModalBody className="gap-1">
              <Divider />
              {activity?.exercises?.map((exercise, i) => (
                <div key={i}>
                  <h2 className="text-md mb-2">{exercise.Exercise.name}</h2>
                  <Table removeWrapper aria-label="Exercise Details">
                    <TableHeader>
                      <TableColumn>Set</TableColumn>
                      <TableColumn>
                        {exercise.trackingType === "REPS_ONLY" ? "Reps" : 
                         exercise.trackingType === "DURATION" ? "Duration" : 
                         exercise.trackingType === "DISTANCE" ? "Distance" : 
                         "Reps"}
                      </TableColumn>
                      <TableColumn>
                        {exercise.trackingType !== "DURATION" && exercise.trackingType !== "REPS_ONLY" ? "Weight" : ""}
                      </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {exercise.sets.map((set, j) => (
                        <TableRow key={j}>
                          <TableCell>{j + 1}</TableCell>
                          <TableCell>
                            {exercise.trackingType === "DURATION" ? (
                              set.exerciseDuration !== null ? (
                                <FormatDuration seconds={set.exerciseDuration} />
                              ) : (
                                "N/A"
                              )
                            ) : exercise.trackingType === "DISTANCE" ? (
                              `${set.reps || 0} meters`
                            ) : (
                              set.reps || "N/A"
                            )}
                          </TableCell>
                          <TableCell>
                            {exercise.trackingType !== "DURATION" && exercise.trackingType !== "REPS_ONLY" ? 
                              `${set.weight || 0} lbs` : ""}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Divider className="my-2" />
                </div>
              ))}
            </ModalBody>
            <ModalFooter className="pt-0">
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}