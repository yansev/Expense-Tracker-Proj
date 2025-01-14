import React, { useState } from "react";
import AddExpense from "../components/expenses/AddExpense";
import {
  Box,
  Spacer,
  VStack,
  Stack,
  Container,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ExpensesTable from "../tables/ExpensesTable";
import { Expense } from "../../entities/expense/model";
import ActualVsPlannedExpenses from "../charts/ExpensesChart";
import CalcModal from "../components/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";

const ExpensesList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addExpense = (newExpense: Expense) => {
    console.log("Adding expense:", newExpense);
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const deleteExpense = (expense: Expense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((e) => e.id !== expense.id)
    );
  };

  return (
    <Container maxW="container.lg" p={[1, 2, 3]}>
      <VStack p={[1, 2, 3]}>
        <Stack
          direction={["column", "column", "row"]}
          mt={[1, 2, 3]}
          mb={[1, 2, 3]}
          spacing={[1, 2, 3]}
        >
          <Box>
            <ActualVsPlannedExpenses />
          </Box>
          <Box>
            <ExpensesTable
              expenses={expenses}
              onUpdatedExpense={updateExpense}
              onDeleteExpense={deleteExpense}
            />
            <Box width={["100%", "50%", "33%"]}>
              <AddExpense onAddExpense={addExpense} />
            </Box>
          </Box>
          <Spacer>
            <Box width="300px" position="absolute" right="0" p="4">
              <Button onClick={onOpen} position="absolute" right="0">
                <AiFillCalculator />
                <CalcModal isOpen={isOpen} onClose={onClose} />
              </Button>
            </Box>
          </Spacer>
        </Stack>
      </VStack>
    </Container>
  );
};

export default ExpensesList;
