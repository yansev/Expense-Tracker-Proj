import React from "react";
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ActualVsPlannedExpenses: React.FC = () => {
  const data = {
    id: "1",
    name: "Food",
    amount: 2000,
  };

  const data2 = {
    id: "1",
    name: "Food",
    amount: 1800,
  };

  const chartData = {
    labels: ["Food"],
    datasets: [
      {
        label: "Planned Amount",
        data: [data.amount],
        backgroundColor: "#D0E3FF",
      },
      {
        label: "Actual Amount",
        data: [data2.amount],
        backgroundColor: "#EDF1F6",
      },
    ],
  };

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
