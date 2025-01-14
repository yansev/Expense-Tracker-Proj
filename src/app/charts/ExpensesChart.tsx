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
        backgroundColor: "#36A2EB",
      },
      {
        label: "Actual Amount",
        data: [data2.amount],
        backgroundColor: "#FF6384",
      },
    ],
  };

  return (
    <div>
      <h1>Actual Amount vs Planned Amount</h1>
      <Bar data={chartData} />
    </div>
  );
};

export default ActualVsPlannedExpenses;
