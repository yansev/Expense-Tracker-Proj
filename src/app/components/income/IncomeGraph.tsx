import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Container, Heading } from "@chakra-ui/react";
import { IncomeChartProps } from "./types/IncomeTypes";
import { useMonth } from "../../shared/hooks/MonthContext";
import { useFilteredIncome } from "./hooks/useFilteredIncome";
import { useFilterExpenses } from "../expenses/hooks/useFilterExpenses";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const IncomeExpensesGraph: React.FC<IncomeChartProps> = ({
  income,
  expenses = [],
}) => {
  const { selectedMonth } = useMonth();
  const [chartData, setChartData] = useState({
    labels: ["Income vs Expenses"],
    datasets: [
      {
        label: "Income",
        data: [0],
        backgroundColor: "#91a56e",
      },
      {
        label: "Expenses",
        data: [0],
        backgroundColor: "#8f8b84",
      },
    ],
  });

  // Filter income and expenses based on the selected month
  const filteredIncome = useFilteredIncome(income, selectedMonth);

  const filteredExpenses = useFilterExpenses(expenses, selectedMonth);

  // Calculate totals for the filtered income and expenses
  const totalIncome = filteredIncome.reduce(
    (total, income) => total + (income.amount || 0),
    0
  );
  const totalExpenses =
    filteredExpenses?.reduce(
      (total, expense) => total + expense.actualAmount,
      0
    ) || 0;

  useEffect(() => {
    setChartData({
      labels: ["Income vs Expenses"],
      datasets: [
        {
          label: "Income",
          data: [totalIncome],
          backgroundColor: "#91a56e",
        },
        {
          label: "Expenses",
          data: [totalExpenses],
          backgroundColor: "#8f8b84",
        },
      ],
    });
  }, [totalIncome, totalExpenses]);

  return (
    <Container maxW="full">
      <Heading size="md" mb={4} textAlign="center">
        Income vs Expenses
        {selectedMonth === "Whole Year" ? "Whole Year" : selectedMonth}
      </Heading>
      <Bar data={chartData} />
    </Container>
  );
};

export default IncomeExpensesGraph;
