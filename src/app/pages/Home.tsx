import React from "react";
import SummaryPage from "../components/home/HomePage";
import { Box, HStack, Spacer } from "@chakra-ui/react";

const Summary: React.FC = () => (
  <HStack>
    <Box>
      <SummaryPage />
    </Box>

    <Spacer>
      <Box width="20%" position="fixed" right="0" p="4">
        {/* <DateTime /> */}
      </Box>
    </Spacer>
  </HStack>
);

export default Summary;
