import { HStack, VStack, Text, Button } from "@chakra-ui/react";
import { BalanceProps } from "./types/types";
import { useCalculateBalance } from "./hooks/useCalculateBalance";
import { useCalculateSavings } from "./hooks/useCalculateSavings";

const Balance: React.FC<BalanceProps> = ({
  totalIncome,
  totalExpenses,
  totalBills,
}) => {
  const totalSavings = useCalculateSavings(totalIncome);

  const { remainingBalance } = useCalculateBalance(
    totalIncome,
    totalExpenses,
    totalBills,
    totalSavings
  );

  return (
    <VStack spacing={4} align="center" p={4}>
      <Text
        fontSize="40px"
        p={2}
        position="relative"
        fontWeight="extrabold"
        color="#91a56e"
      >
        Remaining Balance:{" "}
        {remainingBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Text>
      <HStack>
        <Button
          fontSize="10px"
          color="#91a56e"
          border="1px solid #91a56e"
          position="relative"
          p={2}
          as="a"
          href="/income"
          _hover={{
            backgroundColor: "#91a56e",
            color: "#ffffff",
          }}
        >
          Total Income:{" "}
          {totalIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Button>
        <Button
          fontSize="10px"
          color="#91a56e"
          border="1px solid #91a56e"
          p={2}
          position="relative"
          as="a"
          href="/expenses"
          _hover={{
            backgroundColor: "#91a56e",
            color: "#ffffff",
          }}
        >
          Total Expenses:{" "}
          {totalExpenses.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Button>
        <Button
          fontSize="10px"
          color="#91a56e"
          border="1px solid #91a56e"
          p={2}
          position="relative"
          as="a"
          href="/bills"
          _hover={{
            backgroundColor: "#91a56e",
            color: "#ffffff",
          }}
        >
          Total Bills:{" "}
          {totalBills.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Button>
        <Button
          fontSize="10px"
          color="#91a56e"
          border="1px solid #91a56e"
          p={2}
          position="relative"
          as="a"
          href="/savings"
          _hover={{
            backgroundColor: "#91a56e",
            color: "#ffffff",
          }}
        >
          Total Savings:{" "}
          {totalSavings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Button>
      </HStack>
    </VStack>
  );
};

export default Balance;
