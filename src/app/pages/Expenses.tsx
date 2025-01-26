import React from "react";
import AddExpense from "../components/expenses/AddExpense";
import {
  Box,
  VStack,
  Stack,
  Button,
  useDisclosure,
  Grid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ExpensesTable from "../components/expenses/ExpensesTable";
import ActualVsPlannedExpenses from "../components/expenses/ExpensesChart";
import CalcModal from "../shared/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";
import { useMonth } from "../shared/hooks/MonthContext";
import MonthSelector from "../shared/MonthSelector";
import useExpenses from "./hooks/useExpenses";

const ExpensesList: React.FC = () => {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedMonth } = useMonth();

  const totalExpenses = expenses
    .filter((expense) => expense.month === selectedMonth)
    .reduce((sum, expense) => sum + expense.actualAmount, 0);

  return (
    <Grid
      templateColumns={["2fr", "1fr", "2fr", "2fr 1fr"]}
      templateRows={["1fr", "1fr", "1fr 1fr"]}
      gap={4}
      minH="100vh"
      w="100%"
      p={4}
    >
      <VStack spacing={4} align="stretch">
        <MonthSelector />
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Summary
          </Text>
          <Box
            border="1px solid #e2e8f0"
            borderRadius="md"
            p={4}
            backgroundColor="gray.50"
            fontSize="md"
          >
            <Text>
              Total Expenses for {selectedMonth}: ₱
              {totalExpenses.toLocaleString()}
            </Text>
          </Box>
        </Box>

        <Stack
          direction={["column", "row"]}
          spacing={4}
          w="100%"
          align="stretch"
          overflow="hidden"
        >
          <Box flex="1" minWidth="0" overflow="hidden">
            <ActualVsPlannedExpenses expenses={expenses} />
          </Box>

          <Box flex="2" minWidth="0" overflow="hidden">
            <Box overflowX="auto">
              <ExpensesTable
                expenses={expenses}
                selectedMonth={selectedMonth}
                onUpdatedExpense={updateExpense}
                onDeleteExpense={deleteExpense}
              />
            </Box>
            <Box mt={4}>
              <AddExpense onAddExpense={addExpense} />
            </Box>
          </Box>
        </Stack>

        <Box
          p={4}
          border="1px solid #e2e8f0"
          borderRadius="md"
          backgroundColor="gray.50"
          mt={4}
          w="100%"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Notes
          </Text>
          <Textarea
            placeholder="Add notes about your expenses here..."
            size="md"
            h="120px"
            resize="none"
          />
        </Box>
      </VStack>

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

export default ExpensesList;
