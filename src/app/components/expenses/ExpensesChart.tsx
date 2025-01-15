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
import { ExpensesChartProps } from "../../../entities/expense/model";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActualVsPlannedExpenses: React.FC<ExpensesChartProps> = ({
  expenses,
}) => {
  const [chartData, setChartData] = useState({
    labels: ["Expenses"],
    datasets: [
      {
        label: "Planned Amount",
        data: [0],
        backgroundColor: "#D0E3FF",
      },
      {
        label: "Actual Amount",
        data: [0],
        backgroundColor: "#FFB6C1",
      },
    ],
  });

  useEffect(() => {
    const totalPlannedAmount = expenses.reduce(
      (total, expense) => total + (expense.plannedAmount || 0),
      0
    );
    const totalActualAmount = expenses.reduce(
      (total, expense) => total + (expense.actualAmount || 0),
      0
    );

    setChartData({
      labels: ["Expenses"],
      datasets: [
        {
          label: "Planned Amount",
          data: [totalPlannedAmount],
          backgroundColor: "#D0E3FF",
        },
        {
          label: "Actual Amount",
          data: [totalActualAmount],
          backgroundColor: "#FFB6C1",
        },
      ],
    });
  }, [expenses]);

  return (
    <Container maxW="full">
      <Heading size="md" mb={4} textAlign="center">
        Actual Amount vs Planned Amount
      </Heading>
      <Bar data={chartData} />
    </Container>
  );
};

export default ActualVsPlannedExpenses;
