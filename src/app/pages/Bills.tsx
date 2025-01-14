import Bills from "../components/AddBills";
import Calculator from "../components/calculator/Calculator";
import BillsTable from "../tables/BillsTable";
import { Box, Spacer, VStack } from "@chakra-ui/react";

const BillsPage: React.FC = () => {
  return (
    <VStack>
      <Box>
        <BillsTable />
      </Box>

      <Box width={["100%", "50%", "33%"]}>
        <Bills />
      </Box>
      <Spacer>
        <Box width="300px" position="fixed" right="0" p="4">
          <Calculator />
        </Box>
      </Spacer>
    </VStack>
  );
};

export default BillsPage;
