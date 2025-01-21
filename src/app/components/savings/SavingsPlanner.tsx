import { HStack, VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SavingsPlannerProps } from "../../../entities/model";

const SavingsPlanner: React.FC<SavingsPlannerProps> = ({
  totalIncome,
  totalExpenses,
  totalBills,
}) => {
  const [remainingBalance, setRemainingBalance] = useState<number>(0);
  const totalSavings = totalIncome * 0.2;

  const calculateRemainingBalance = (
    income: number,
    expenses: number,
    savingsPercentage: number,
    bills: number
  ) => {
    const savings = (income * savingsPercentage) / 100;
    const remaining = income - expenses - bills - savings;
    setRemainingBalance(remaining);
  };

  // Automatically apply a 20% savings percentage when the component mounts
  useEffect(() => {
    calculateRemainingBalance(totalIncome, totalExpenses, 20, totalBills);
  }, [totalIncome, totalExpenses, totalBills, totalSavings]);

  return (
    <VStack spacing={4} align="center" p={4}>
      <Text
        fontSize="40px"
        color="#FFFFFF"
        p={2}
        position="relative"
        fontWeight="bold"
      >
        Remaining Balance:{" "}
        {remainingBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Text>
      <HStack>
        <Text
          fontSize="10px"
          color="#FFFFFF"
          border="1px solid #ffffff"
          position="relative"
          p={2}
        >
          Total Income:{" "}
          {totalIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <Text
          fontSize="10px"
          color="#FFFFFF"
          border="1px solid #ffffff"
          p={2}
          position="relative"
        >
          Total Expenses:{" "}
          {totalExpenses.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <Text
          fontSize="10px"
          color="#FFFFFF"
          border="1px solid #ffffff"
          p={2}
          position="relative"
        >
          Total Bills:{" "}
          {totalBills.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
        <Text
          fontSize="10px"
          color="#FFFFFF"
          border="1px solid #ffffff"
          p={2}
          position="relative"
        >
          Total Savings:{" "}
          {totalSavings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </HStack>
    </VStack>
  );
};

export default SavingsPlanner;
