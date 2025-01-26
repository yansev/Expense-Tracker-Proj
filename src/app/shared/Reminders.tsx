import React, { useEffect, useState } from "react";
import { Box, Text, Badge, VStack } from "@chakra-ui/react";
import { RemindersProps } from "../components/bills/types/BillTypes";

const Reminders: React.FC<{ bills: RemindersProps[] }> = ({ bills }) => {
  const [reminders, setReminders] = useState<RemindersProps[]>([]);
  const [cautions, setCautions] = useState<RemindersProps[]>([]);

  useEffect(() => {
    const today = new Date();

    const updatedReminders = bills.filter((bill) => {
      if (bill.status !== "Not Paid") return false;

      const dueDate = new Date(bill.dueDate);
      const differenceInDays = Math.ceil(
        (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return differenceInDays <= 3 && differenceInDays > 0;
    });

    const updatedCautions = bills.filter((bill) => {
      if (bill.status !== "Not Paid") return false;

      const dueDate = new Date(bill.dueDate);
      return today > dueDate;
    });

    setReminders(updatedReminders);
    setCautions(updatedCautions);
  }, [bills]);

  return (
    <VStack align="start" spacing={4} p={4} bg="gray.100" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold">
        Notifications
      </Text>

      {reminders.length > 0 && (
        <Box>
          <Text fontSize="md" fontWeight="semibold" color="yellow.600">
            Due Soon
          </Text>
          {reminders.map((bill) => (
            <Box
              key={bill.id}
              p={2}
              bg="yellow.100"
              border="1px"
              borderColor="yellow.400"
              borderRadius="md"
              mt={2}
            >
              <Text fontSize="sm">
                <Badge colorScheme="yellow">Reminder</Badge> {bill.billName} is
                due on {bill.dueDate}.
              </Text>
            </Box>
          ))}
        </Box>
      )}

      {cautions.length > 0 && (
        <Box>
          <Text fontSize="md" fontWeight="semibold" color="red.600">
            Overdue
          </Text>
          {cautions.map((bill) => (
            <Box
              key={bill.id}
              p={2}
              bg="red.100"
              border="1px"
              borderColor="red.400"
              borderRadius="md"
              mt={2}
            >
              <Text fontSize="sm">
                <Badge colorScheme="red">Caution</Badge> {bill.billName} was due
                on {bill.dueDate} and is still unpaid.
              </Text>
            </Box>
          ))}
        </Box>
      )}

      {reminders.length === 0 && cautions.length === 0 && (
        <Text fontSize="sm" color="gray.500">
          No notifications at the moment.
        </Text>
      )}
    </VStack>
  );
};

export default Reminders;
