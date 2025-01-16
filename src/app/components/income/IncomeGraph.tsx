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
import { IncomeChartProps } from "../../../entities/expense/model";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const IncomeExpensesGraph: React.FC<IncomeChartProps> = ({
  income,
  expenses,
}) => {
  const [chartData, setChartData] = useState({
    labels: ["Income vs Expenses"],
    datasets: [
      {
        label: "Income",
        data: [0],
        backgroundColor: "#D0E3FF",
      },
      {
        label: "Expenses",
        data: [0],
        backgroundColor: "#FFB6C1",
      },
    ],
  });

  useEffect(() => {
    const totalIncome = income.reduce(
      (total, income) => total + (income.amount || 0),
      0
    );
    const totalExpenses =
      expenses?.reduce((total, expense) => total + expense.actualAmount, 0) ||
      0;

    setChartData({
      labels: ["Income vs Expenses"],
      datasets: [
        {
          label: "Income",
          data: [totalIncome],
          backgroundColor: "#D0E3FF",
        },
        {
          label: "Expenses",
          data: [totalExpenses],
          backgroundColor: "#FFB6C1",
        },
      ],
    });
  }, [income, expenses]);

  return (
    <Container maxW="full">
      <Heading size="md" mb={4} textAlign="center">
        Income vs Expenses
      </Heading>
      <Bar data={chartData} />
    </Container>
  );
};

export default IncomeExpensesGraph;
