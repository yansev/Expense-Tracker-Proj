import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { SummaryData } from "./types/HomeTypes";

ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryPage: React.FC<SummaryData> = ({
  income = 0,
  expenses = 0,
  savings = 0,
  bills = 0,
}) => {
  const [chartData, setChartData] = useState({
    labels: ["Income, Expenses, Savings, Bills"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#606e52", "#91a56e", "#c0cca4", "#8f8b84"],
        hoverBackgroundColor: ["#606e52", "#91a56e", "#c0cca4", "#8f8b84"],
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: ["Income", "Expenses", "Savings", "Bills"],
      datasets: [
        {
          data: [income, expenses, savings, bills],
          backgroundColor: ["#606e52", "#91a56e", "#c0cca4", "#8f8b84"],
          hoverBackgroundColor: ["#606e52", "#91a56e", "#c0cca4", "#8f8b84"],
        },
      ],
    });
  }, [income, expenses, savings, bills]);

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
};

export default SummaryPage;
