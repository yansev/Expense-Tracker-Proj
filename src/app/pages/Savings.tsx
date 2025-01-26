import {
  Box,
  VStack,
  Heading,
  Text,
  Grid,
  Divider,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import SavingsPlanner from "../shared/Balance";
import SavingsTable from "../components/savings/SavingsTable";
import useSavings from "./hooks/useSavings";

const SavingsPlannerPage: React.FC = () => {
  const {
    totalIncome,
    totalExpenses,
    totalBills,
    totalSavings,
    incomeData,
    savingsData,
    setTotalSavings,
  } = useSavings();

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
      minH="100vh"
      p={4}
      w="100%"
      gap={6}
      bg="gray.50"
    >
      <Box gridColumn="1 / -1" textAlign="center" mb={6}>
        <Heading as="h1" size="lg" color="teal.600">
          Savings Planner
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Track your income, expenses, and savings effectively.
        </Text>
        <Divider my={4} />
      </Box>

      <VStack spacing={6} align="stretch">
        <Box
          bg="white"
          p={6}
          shadow="md"
          rounded="md"
          border="1px"
          borderColor="gray.200"
        >
          <SavingsPlanner
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            totalBills={totalBills}
            totalSavings={totalSavings}
          />
        </Box>

        <Box
          bg="white"
          p={6}
          shadow="md"
          rounded="md"
          border="1px"
          borderColor="gray.200"
        >
          <SavingsTable
            income={incomeData}
            savings={savingsData}
            onTotalSavingsChange={setTotalSavings}
          />
        </Box>
      </VStack>

      <VStack spacing={6} align="stretch">
        <Box
          bg="white"
          p={6}
          shadow="md"
          rounded="md"
          border="1px"
          borderColor="gray.200"
        >
          <Heading as="h3" size="md" mb={4}>
            Quick Savings Tips
          </Heading>
          <UnorderedList spacing={3} color="gray.700">
            <ListItem>
              Automate your savings to avoid spending temptations.
            </ListItem>
            <ListItem>
              Set short-term goals to stay motivated and track your progress.
            </ListItem>
            <ListItem>
              Cut back on non-essential expenses, like subscriptions or dining
              out.
            </ListItem>
            <ListItem>
              Build an emergency fund to avoid financial stress in unexpected
              situations.
            </ListItem>
            <ListItem>
              Regularly review your budget and adjust as needed.
            </ListItem>
          </UnorderedList>
        </Box>
      </VStack>
    </Grid>
  );
};

export default SavingsPlannerPage;
