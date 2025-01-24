import SummaryPage from "../components/home/Summary";
import {
  Box,
  Grid,
  VStack,
  Heading,
  Text,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import Balance from "../shared/Balance";
import useHome from "./hooks/useHome";
import Reminders from "../shared/Reminders";
import { Bill } from "../components/bills/types/BillTypes";
import AddExpense from "../components/expenses/AddExpense";
import { Expense } from "../components/expenses/types/ExpensesTypes";
import useExpenses from "./hooks/useExpenses";
import useBills from "./hooks/useBills";
import useIncome from "./hooks/useIncome";
import { Income } from "../components/income/types/IncomeTypes";
import AddIncome from "../components/income/AddIncome";
import AddBill from "../components/bills/AddBills";

const Summary: React.FC = () => {
  const { totalIncome, totalExpenses, totalBills, totalSavings, bills } =
    useHome();
  const { addExpense } = useExpenses();
  const { addBill } = useBills();
  const { addIncome } = useIncome();

  const onAddExpense = (expense: Expense) => {
    addExpense(expense);
  };

  const onAddBill = (bill: Bill) => {
    addBill(bill);
  };

  const onAddIncome = (income: Income) => {
    addIncome(income);
  };

  return (
    <Grid
      templateColumns={["1fr", "1fr 3fr"]}
      gap={6}
      minH="100vh"
      p={6}
      bg="gray.50"
    >
      <VStack
        spacing={6}
        align="stretch"
        bg="#474747"
        color="white"
        p={4}
        borderRadius="lg"
        shadow="lg"
      >
        <Heading size="md" mb={2}>
          Quick Actions
        </Heading>
        <AddExpense onAddExpense={onAddExpense} />
        <AddBill onAddBill={onAddBill} />
        <AddIncome onAddIncome={onAddIncome} />
        <Divider borderColor="white" />
        <Text fontSize="sm" color="white">
          Manage your finances with ease. Use the quick actions above to stay on
          top of your budget!
        </Text>
      </VStack>
      <VStack spacing={6} align="stretch">
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          shadow="sm"
          border="1px solid"
          borderColor="green.100"
        >
          <Heading size="lg" mb={4}>
            Financial Overview
          </Heading>
          <Balance
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            totalBills={totalBills}
            totalSavings={totalSavings}
          />
        </Box>

        <Grid templateColumns={["1fr", "1fr 1fr"]} gap={6}>
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="sm"
            border="1px solid"
            borderColor="green.100"
          >
            <Heading size="md" mb={4}>
              Budget Summary
            </Heading>
            <Tooltip
              label="This chart visualizes the distribution of your income, expenses, savings, and bills."
              placement="top"
              hasArrow
            >
              <Box>
                <SummaryPage
                  income={totalIncome}
                  expenses={totalExpenses}
                  savings={totalSavings}
                  bills={totalBills}
                />
              </Box>
            </Tooltip>
          </Box>

          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            shadow="sm"
            border="1px solid"
            borderColor="green.100"
          >
            <Heading size="md" mb={4}>
              Notifications
            </Heading>
            <Reminders
              bills={bills.map((bill: Bill) => ({
                id: bill.id,
                status: bill.paid ? "Paid" : "Not Paid",
                billName: bill.billTitle,
                dueDate: bill.dueDate,
                amount: bill.actualAmount || bill.plannedAmount,
              }))}
            />
          </Box>
        </Grid>
      </VStack>
    </Grid>
  );
};

export default Summary;
