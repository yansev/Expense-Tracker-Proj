import React from "react";
import SummaryPage from "../components/home/HomePage";
import { Box, VStack } from "@chakra-ui/react";

const Summary: React.FC = () => (
  <VStack>
    <Box>
      <SummaryPage />
    </Box>
    <Box>{/* <CalendarApp /> */}</Box>
  </VStack>
);

export default Summary;
