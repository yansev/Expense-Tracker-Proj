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
import { IncomeChartProps } from "../../../entities/model";
import { useMonth } from "../../shared/hooks/MonthContext";
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

  useEffect(() => {
    // Filter income and expenses based on the selected month
    const filteredIncome =
      selectedMonth === "All" || !selectedMonth
        ? income
        : income.filter((income) => income.month === selectedMonth);

    const filteredExpenses =
      selectedMonth === "All" || !selectedMonth
        ? expenses
        : expenses.filter((expense) => expense.month === selectedMonth);

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
  }, [income, selectedMonth, expenses]);

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
