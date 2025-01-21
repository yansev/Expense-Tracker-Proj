import { useState, useEffect } from "react";
import axios from "axios";
import { Income, Expense, Bill, Savings } from "../../entities/model";
import SavingsPlanner from "../components/savings/SavingsPlanner";
import { Box, Grid, VStack } from "@chakra-ui/react";
import SavingsTable from "../components/savings/SavingsTable";

const SavingsPlannerPage: React.FC = () => {
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState<number>(10);
  const [expensesData, setExpensesData] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [billsData, setBillsData] = useState<Bill[]>([]);
  const [totalBills, setTotalBills] = useState(0);
  const [savingsData, setSavingsData] = useState<Savings[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get("http://localhost:3030/income");
        const total = response.data.reduce(
          (sum: number, inc: Income) => sum + inc.amount,
          0
        );
        setTotalIncome(total);
        setIncomeData(response.data);
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
    fetchIncome();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3030/expenses");
        const total = response.data.reduce(
          (sum: number, exp: Expense) => sum + exp.actualAmount,
          0
        );
        setTotalExpenses(total);
        setExpensesData(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:3030/bills");
        const total = response.data.reduce(
          (sum: number, bill: Bill) => sum + bill.actualAmount,
          0
        );
        setTotalBills(total);
        setBillsData(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await axios.get("http://localhost:3030/savings");
        const total = response.data.reduce(
          (sum: number, sav: Savings) => sum + sav.amount,
          0
        );
        setTotalSavings(total);
        setSavingsData(response.data);
      } catch (error) {
        console.error("Error fetching savings:", error);
      }
    };
    fetchSavings();
  }, []);

  useEffect(() => {
    const total = expensesData.reduce(
      (sum, expense) => sum + expense.actualAmount,
      0
    );
    setTotalExpenses(total);
  }, [expensesData]);

  useEffect(() => {
    const total = savingsData.reduce((sum, savings) => sum + savings.amount, 0);
    setTotalSavings(total);
  }, [savingsData]);

  useEffect(() => {
    const total = billsData.reduce((sum, bill) => sum + bill.actualAmount, 0);
    setTotalBills(total);
  }, [billsData]);

  return (
    <Grid templateColumns="2fr 2fr" minH="100vh" p={4}>
      <Box></Box>
      <VStack
        align="stretch"
        spacing={8}
        border="1px solid #081F5C"
        borderRadius="md"
        boxShadow="md"
        p={8}
        bg="#F9B17A"
      >
        <Box mb="50px" w="100%">
          <SavingsPlanner
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            totalBills={totalBills}
            totalSavings={totalSavings}
            onSavingsChange={setSavingsPercentage}
          />
        </Box>
        <Box w="100%" justifyContent="center">
          <SavingsTable
            savingsPercentage={savingsPercentage}
            income={incomeData}
            onTotalSavingsChange={setTotalSavings}
          />
        </Box>
      </VStack>
      <Box
        w={["100%", "75%", "50%"]}
        display="flex"
        justifyContent="center"
      ></Box>
    </Grid>
  );
};

export default SavingsPlannerPage;
