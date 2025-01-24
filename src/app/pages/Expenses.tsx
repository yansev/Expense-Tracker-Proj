import React from "react";
import AddExpense from "../components/expenses/AddExpense";
import {
  Box,
  VStack,
  Stack,
  Container,
  Button,
  useDisclosure,
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

  return (
    <Container maxW="container.xl" p={[4, 6, 8]} overflow="hidden">
      <VStack spacing={6} align="stretch">
        <MonthSelector />
        <Stack
          direction={["column", "row"]}
          spacing={6}
          align="stretch"
          width="100%"
        >
          <Box flex="1" minWidth="0">
            <ActualVsPlannedExpenses expenses={expenses} />
          </Box>
          <Box flex="2" minWidth="0">
            <Box overflowX="auto">
              {" "}
              <ExpensesTable
                expenses={expenses}
                selectedMonth={selectedMonth}
                onUpdatedExpense={updateExpense}
                onDeleteExpense={deleteExpense}
              />
            </Box>
            <Box position="absolute" p={4}>
              <AddExpense onAddExpense={addExpense} />
            </Box>
          </Box>
        </Stack>
        <Stack
          direction={["column", "row"]}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Button onClick={onOpen} leftIcon={<AiFillCalculator />}>
            Open Calculator
          </Button>
        </Stack>

        {/* Calculator Modal */}
        <CalcModal isOpen={isOpen} onClose={onClose} />
      </VStack>
    </Container>
  );
};

export default ExpensesList;
