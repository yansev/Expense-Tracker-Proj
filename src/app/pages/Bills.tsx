import React from "react";
import {
  Box,
  VStack,
  Button,
  Grid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CalcModal from "../shared/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";
import { useMonth } from "../shared/hooks/MonthContext";
import MonthSelector from "../shared/MonthSelector";
import AddBills from "../components/bills/AddBills";
import BillsTable from "../components/bills/BillsTable";
import useBills from "./hooks/useBills";
import Reminders from "../shared/Reminders";

const Bills: React.FC = () => {
  const { bills, addBill, updateBill, deleteBill } = useBills();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedMonth } = useMonth();

  // Count unpaid bills
  const unpaidBills = bills.filter((bill) => !bill.paid).length;

  return (
    <Grid
      templateRows="auto 1fr auto"
      gap={4}
      minH="100vh"
      maxW="100vw"
      overflow="hidden"
      ml="0"
      p={4}
    >
      <VStack spacing={4} align="stretch">
        <MonthSelector />
        <Box
          bg="gray.50"
          borderRadius="md"
          p={4}
          border="1px solid #e2e8f0"
          textAlign="center"
        >
          <Text fontSize="lg" fontWeight="bold">
            Unpaid Bills:
          </Text>
          <Text fontSize="2xl" color="red.600">
            {unpaidBills}
          </Text>
        </Box>
      </VStack>

      <Grid
        templateColumns={["1fr", "2fr 1fr"]}
        gap={4}
        alignItems="start"
        overflow="hidden"
      >
        <Box flex="1" minWidth="0">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Bills Table
          </Text>
          <BillsTable
            bills={bills}
            onUpdatedBill={updateBill}
            onDeleteBill={deleteBill}
            selectedMonth={selectedMonth}
          />
          <Box mt={4}>
            <AddBills onAddBill={addBill} />
          </Box>
        </Box>

        <Box
          flex="1"
          minWidth="0"
          p={4}
          border="1px solid #e2e8f0"
          borderRadius="md"
          backgroundColor="gray.50"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Reminders
          </Text>
          <Reminders
            bills={bills.map((bill) => ({
              id: bill.id,
              status: bill.paid ? "Paid" : "Not Paid",
              billName: bill.billTitle,
              dueDate: bill.dueDate,
              amount: bill.actualAmount || bill.plannedAmount,
            }))}
          />
        </Box>
      </Grid>

      <Box position="fixed" bottom="20px" right="20px">
        <Button onClick={onOpen} colorScheme="green" size="lg" p={4}>
          <AiFillCalculator style={{ marginRight: "8px" }} />
          Calculator
        </Button>
        <CalcModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Grid>
  );
};

export default Bills;
