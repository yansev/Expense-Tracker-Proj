import Income from "../components/AddIncome";
import { Box, VStack, Spacer } from "@chakra-ui/react";
import IncomeTable from "../tables/IncomeTable";
import Calculator from "../components/calculator/Calculator";

const IncomePage: React.FC = () => (
  <VStack>
    <Box>
      <IncomeTable />
    </Box>

    <Box width={["100%", "50%", "33%"]}>
      <Income />
    </Box>
    <Spacer>
      <Box width="300px" position="fixed" right="0" p="4">
        <Calculator />
      </Box>
    </Spacer>
  </VStack>
);

export default IncomePage;
