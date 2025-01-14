import React from "react";
import SavingsPlanner from "../components/SavingsPlanner";
import { Box, VStack } from "@chakra-ui/react";
import SavingsChallenge from "../components/SavingsChallenge";

const SavingsPlannerPage: React.FC = () => (
  <VStack>
    <Box mb="50px">
      <h1>Savings Planner and Tracker</h1>
      <SavingsPlanner />/
    </Box>

    <Box mb="50px">
      <h1>Savings Challenge</h1>
      <SavingsChallenge />/
    </Box>
  </VStack>
);

export default SavingsPlannerPage;
