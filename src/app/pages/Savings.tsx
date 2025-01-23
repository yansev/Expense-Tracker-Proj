import React from "react";
import { Box, Grid, VStack } from "@chakra-ui/react";
import SavingsPlanner from "../shared/Balance";
import SavingsTable from "../components/savings/SavingsTable";
import useSavings from "./hooks/useSavings";

const SavingsPlannerPage: React.FC = () => {
  const {
    incomeData,
    totalIncome,
    totalExpenses,
    totalBills,
    savingsData,
    totalSavings,
    setTotalSavings,
  } = useSavings();

  return (
    <Grid templateColumns="2fr 2fr" minH="100vh" p={4}>
      <Box></Box>
      <VStack
        align="stretch"
        spacing={8}
        border="1px solid #081F5C"
        borderRadius="md"
        boxShadow="md"
        p={8}
      >
        <Box mb="50px" w="100%">
          <SavingsPlanner
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            totalBills={totalBills}
            totalSavings={totalSavings}
          />
        </Box>
        <Box w="100%" justifyContent="center">
          <SavingsTable
            income={incomeData}
            savings={savingsData}
            onTotalSavingsChange={setTotalSavings}
          />
        </Box>
      </VStack>
      <Box
        w={["100%", "75%", "50%"]}
        display="flex"
        justifyContent="center"
      ></Box>
    </Grid>
  );
};

export default SavingsPlannerPage;
