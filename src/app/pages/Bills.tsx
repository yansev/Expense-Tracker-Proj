import React from "react";
import {
  Box,
  Spacer,
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
import Scheduler from "../components/bills/Scheduler";
import useBills from "./hooks/useBills";

const Bills: React.FC = () => {
  const { bills, addBill, updateBill, deleteBill } = useBills();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedMonth } = useMonth();

  return (
    <Container maxW="container.xl" p={[1, 2, 3]}>
      <VStack p={[1, 2, 3]} align="center">
        <MonthSelector />
        <Stack
          direction={["column", "column", "row"]}
          mt={[1, 2, 3]}
          mb={[1, 2, 3]}
          spacing={[1, 2, 3]}
        >
          <Box width={["100vw", "75vw", "50vw"]}>
            <Scheduler bills={bills} />
          </Box>
          <Box width={["100vw", "75vw", "50vw"]} position="relative">
            <BillsTable
              bills={bills}
              onUpdatedBill={updateBill}
              onDeleteBill={deleteBill}
              selectedMonth={selectedMonth}
            />
            <Box
              width={["100%", "50%", "33%"]}
              position="absolute"
              mt="5"
              ml="5"
            >
              <AddBills onAddBill={addBill} />
            </Box>
          </Box>
          <Spacer>
            <Box width="300px" position="absolute" right="0" p="4">
              <Button onClick={onOpen} position="fixed" right="0">
                <AiFillCalculator />
                <CalcModal isOpen={isOpen} onClose={onClose} />
              </Button>
            </Box>
          </Spacer>
        </Stack>
      </VStack>
    </Container>
  );
};

export default Bills;
