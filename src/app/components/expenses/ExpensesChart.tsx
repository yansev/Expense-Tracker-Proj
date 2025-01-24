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
import { ExpensesChartProps } from "./types/ExpensesTypes";
import { useMonth } from "../../shared/hooks/MonthContext";
import { useTotalAmount } from "./hooks/useTotalExpenseAmount";
import { useFilterExpenses } from "./hooks/useFilterExpenses";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActualVsPlannedExpenses: React.FC<ExpensesChartProps> = ({
  expenses,
}) => {
  const { selectedMonth } = useMonth();
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

  const filteredExpenses = useFilterExpenses(expenses, selectedMonth);
  const { totalPlannedAmount, totalExpActualAmount } =
    useTotalAmount(filteredExpenses);

  useEffect(() => {
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
          data: [totalExpActualAmount],
          backgroundColor: "#FFB6C1",
        },
      ],
    });
  }, [totalPlannedAmount, totalExpActualAmount]);

  return (
    <Container maxW="full">
      <Heading size="md" mb={4} textAlign="center">
        Actual Amount vs Planned Amount
        {selectedMonth === "All" ? "All Years" : selectedMonth}
      </Heading>
      <Bar data={chartData} />
    </Container>
  );
};

export default ActualVsPlannedExpenses;
