import React, { useState } from "react";
import AddExpense from "../components/expenses/AddExpense";
import { Box, Spacer, VStack, Stack, Container } from "@chakra-ui/react";
import ExpensesTable from "../tables/ExpensesTable";
import Calculator from "../components/calculator/Calculator";
import { Expense } from "../../entities/expense/model";
import ActualVsPlannedExpenses from "../charts/ExpensesChart";

const ExpensesList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (newExpense: Expense) => {
    console.log("Adding expense:", newExpense);
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
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
            <ExpensesTable expenses={expenses} />
          </Box>
        </Stack>
        <Stack
          width="100%"
          direction={["column", "column", "row"]}
          mt={[1, 2, 3]}
          mb={[1, 2, 3]}
          spacing={[1, 2, 3]}
        >
          <Box width={["100%", "50%", "33%"]}>
            <AddExpense onAddExpense={addExpense} />
          </Box>
          <Spacer>
            <Box width="300px" position="fixed" right="0" p="4">
              <Calculator />
            </Box>
          </Spacer>
        </Stack>
      </VStack>
    </Container>
  );
};

export default ExpensesList;
