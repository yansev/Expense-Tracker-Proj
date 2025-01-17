import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { SummaryData } from "../../../features/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryPage: React.FC = () => {
  // Mock data; replace with real data fetching logic
  const data: SummaryData = {
    income: 5000,
    expenses: 2000,
    savings: 1500,
  };

  const chartData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        data: [data.income, data.expenses, data.savings],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h1>Financial Summary</h1>
      <Pie data={chartData} />
    </div>
  );
};

export default SummaryPage;
