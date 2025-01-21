import { HStack, VStack, Select, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SavingsPlannerProps } from "../../../entities/model";

const SavingsPlanner: React.FC<SavingsPlannerProps> = ({
  totalIncome,
  // onSavingsChange,
}) => {
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0);
  const [remainingIncome, setRemainingIncome] = useState<number>(totalIncome);

  const handleSavingsPercentageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSavingsPercentage = parseFloat(e.target.value);
    setSavingsPercentage(newSavingsPercentage);
    calculateRemainingIncome(totalIncome, newSavingsPercentage);
  };

  const calculateRemainingIncome = (
    income: number,
    savingsPercentage: number
  ) => {
    const savingsAmount = (income * savingsPercentage) / 100;
    const remaining = income - savingsAmount;
    setRemainingIncome(remaining);
  };

  const percentages = [
    "5",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
  ];

  // const handleSavingsChange = (value: number) => {
  //   onSavingsChange(value);
  // };

  return (
    <VStack spacing={4} align="center" p={4}>
      <HStack>
        <Text
          fontSize="20px"
          color="#FFFFFF"
          fontWeight="bold"
          display="inline-block"
          w="100%"
        >
          Savings Percentage:
        </Text>
        <Select
          placeholder="Select Savings Percentage"
          value={savingsPercentage}
          onChange={handleSavingsPercentageChange}
          w="100%"
          bg="#FFFFFF"
          borderColor="#081F5C"
          _hover={{ borderColor: "#054687" }}
          _focus={{ borderColor: "#054687", boxShadow: "0 0 0 1px #054687" }}
        >
          {percentages.map((percentage) => (
            <option key={percentage} value={percentage}>
              {percentage}%
            </option>
          ))}
        </Select>
      </HStack>
      <HStack>
        <Text
          fontSize="20px"
          color="#FFFFFF"
          border="1px solid #ffffff"
          position="relative"
          p={2}
        >
          Total Income: ${totalIncome.toFixed(2)}
        </Text>
        <Text
          fontSize="20px"
          color="#FFFFFF"
          border="1px solid #ffffff"
          p={2}
          position="relative"
        >
          Remaining Income: ${remainingIncome.toFixed(2)}
        </Text>
      </HStack>
    </VStack>
  );
};

export default SavingsPlanner;
