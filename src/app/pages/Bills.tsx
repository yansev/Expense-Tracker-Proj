import React from "react";
import {
  Box,
  VStack,
  Stack,
  Container,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CalcModal from "../shared/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";
import { useMonth } from "../shared/hooks/MonthContext";
import MonthSelector from "../shared/MonthSelector";
import AddBills from "../components/bills/AddBills";
import BillsTable from "../components/bills/BillsTable";
// import Scheduler from "../components/bills/Scheduler";
import useBills from "./hooks/useBills";

const Bills: React.FC = () => {
  const { bills, addBill, updateBill, deleteBill } = useBills();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedMonth } = useMonth();

  return (
    <Container maxW="container.xl" p={[4, 6, 8]}>
      <VStack spacing={6} align="stretch" width="100%">
        {/* Month Selector */}
        <MonthSelector />

        {/* Table Section */}
        <Box flex="1" width="100%" overflowX="auto">
          <BillsTable
            bills={bills}
            onUpdatedBill={updateBill}
            onDeleteBill={deleteBill}
            selectedMonth={selectedMonth}
          />
        </Box>

        {/* Add Bills and Calculator Section */}
        <Stack
          direction={["column", "row"]}
          spacing={4}
          justify="space-between"
          align="center"
          width="100%"
        >
          {/* Add Bills */}
          <AddBills onAddBill={addBill} />

          {/* Calculator Button */}
          <Button onClick={onOpen} leftIcon={<AiFillCalculator />}>
            Open Calculator
          </Button>
        </Stack>

        {/* Calculator Modal */}
        <CalcModal isOpen={isOpen} onClose={onClose} />
      </VStack>
    </Container>
  );
};

export default Bills;
