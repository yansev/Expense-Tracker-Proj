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
import ExpensesTable from "../components/expenses/ExpensesTable";
import { Expense } from "../../entities/model";
import ActualVsPlannedExpenses from "../components/expenses/ExpensesChart";
import CalcModal from "../components/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";
import { useMonth } from "../components/MonthContext";
import MonthSelector from "../components/MonthSelector";

const ExpensesList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedMonth } = useMonth();

  console.log({
    expenseMonth: expenses[0]?.month,
    selectedMonth,
    matches: expenses[0]?.month === selectedMonth,
    expenseData: expenses[0],
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3030/expenses");
        console.log("Fetched Expenses:", response.data);
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const addExpense = async (newExpense: Expense) => {
    try {
      console.log("Adding expense:", newExpense);
      const response = await axios.post(
        "http://localhost:3030/expenses",
        newExpense
      );
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      console.log("Added expense:", response.data);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const updateExpense = async (updatedExpense: Expense) => {
    console.log("Updating expense:", updatedExpense);
    try {
      const response = await axios.put(
        `http://localhost:3030/expenses/${updatedExpense.id}`,
        updatedExpense
      );
      console.log("Updated expense:", response.data);
      if (response.status === 200 || response.status === 204) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === updatedExpense.id ? response.data : expense
          )
        );
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deleteExpense = async (expense: Expense) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/expenses/${expense.id}`
      );
      if (response.status === 200) {
        console.log("Deleted expense:", response.data);
        setExpenses((prevExpenses) =>
          prevExpenses.filter((e) => e.id !== expense.id)
        );
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <Container maxW="container.xl" p={[1, 2, 3]}>
      <VStack p={[1, 2, 3]} align="center">
        <MonthSelector />
        <Stack
          direction={["column", "column", "row"]}
          mt={[1, 2, 3]}
          mb={[1, 2, 3]}
          spacing={[1, 2, 3]}
        >
          <Box width={["100vw", "75vw", "50vw"]}>
            <ActualVsPlannedExpenses expenses={expenses} />
          </Box>
          <Box width={["100vw", "75vw", "50vw"]} position="relative">
            <ExpensesTable
              expenses={expenses}
              selectedMonth={selectedMonth}
              onUpdatedExpense={updateExpense}
              onDeleteExpense={deleteExpense}
            />
            <Box
              width={["100%", "50%", "33%"]}
              position="absolute"
              mt="5"
              ml="5"
            >
              <AddExpense onAddExpense={addExpense} />
            </Box>
          </Box>
          <Spacer>
            <Box width="300px" position="absolute" right="0" p="4">
              <Button onClick={onOpen} position="fixed" right="0">
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
