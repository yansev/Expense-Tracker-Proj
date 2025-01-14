import React from "react";
import SummaryPage from "../components/Summary";
import { Box, HStack, Spacer } from "@chakra-ui/react";
import Calculator from "../components/calculator/Calculator";

const Summary: React.FC = () => (
  <HStack>
    <Box>
      <SummaryPage />
    </Box>

    <Spacer>
      <Box width="20%" position="fixed" right="0" p="4">
        <Calculator />
      </Box>
    </Spacer>
  </HStack>
);

export default Summary;
