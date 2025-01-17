import React from "react";
import { Select } from "@chakra-ui/react";
import { useMonth } from "./MonthContext";

const MonthSelector: React.FC = () => {
  const { selectedMonth, setSelectedMonth } = useMonth();

  const months = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = event.target.value;
    console.log("Selected Month:", newMonth); // Log selected month
    setSelectedMonth(newMonth);
  };

  return (
    <Select
      placeholder="Select month"
      value={selectedMonth}
      onChange={handleMonthChange}
    >
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </Select>
  );
};

export default MonthSelector;
