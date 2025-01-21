import React, { useState } from "react";
import {
  Box,
  Spacer,
  VStack,
  Stack,
  Container,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CalcModal from "../components/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";
import axios from "axios";
import { useEffect } from "react";
import { useMonth } from "../components/MonthContext";
import MonthSelector from "../components/MonthSelector";
import AddBills from "../components/bills/AddBills";
import { Bill } from "../../entities/model";
import BillsTable from "../components/bills/BillsTable";
import Scheduler from "../components/bills/Scheduler";

const Bills: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedMonth } = useMonth();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:3030/bills");
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  const addBill = async (newBill: Bill) => {
    try {
      console.log("Adding bill:", newBill);
      const response = await axios.post("http://localhost:3030/bills", newBill);
      setBills((prevBills) => [...prevBills, response.data]);
      console.log("Added bill:", response.data);
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  const updateBill = async (updatedBill: Bill) => {
    console.log("Updating bill:", updatedBill);
    try {
      const response = await axios.put(
        `http://localhost:3030/bills/${updatedBill.id}`,
        updatedBill
      );
      console.log("Updated bill:", response.data);
      if (response.status === 200 || response.status === 204) {
        setBills((prevBills) =>
          prevBills.map((bill) =>
            bill.id === updatedBill.id ? response.data : bill
          )
        );
      }
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  const deleteBill = async (bill: Bill) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/bills/${bill.id}`
      );
      if (response.status === 200) {
        console.log("Deleted bill:", response.data);
        setBills((prevBills) => prevBills.filter((b) => b.id !== bill.id));
      }
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

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
