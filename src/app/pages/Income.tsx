import {
  Box,
  Spacer,
  VStack,
  Stack,
  Container,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import IncomeTable from "../components/income/IncomeTable";
import CalcModal from "../components/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Income, Expense, Bill, Savings } from "../../entities/model";
import AddIncome from "../components/income/AddIncome";
import axios from "axios";
import IncomeGraph from "../components/income/IncomeGraph";
import { useMonth } from "../components/MonthContext";
import MonthSelector from "../components/MonthSelector";
import IncomeExpensesTable from "../components/income/IncomeExpensesTable";

const IncomeList: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [savings, setSavings] = useState<Savings[]>([]);
  const { selectedMonth } = useMonth();

  const fetchIncome = async () => {
    try {
      const response = await axios.get("http://localhost:3030/income");
      setIncome(response.data);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const addIncome = async (newIncome: Income) => {
    try {
      await axios.post("http://localhost:3030/income", newIncome);
      fetchIncome(); // Now fetchIncome is accessible here
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3030/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

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

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await axios.get("http://localhost:3030/savings");
        setSavings(response.data);
      } catch (error) {
        console.error("Error fetching savings:", error);
      }
    };
    fetchSavings();
  }, []);

  // const addIncome = async (newIncome: Income) => {
  //   console.log("Adding income:", newIncome);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3030/income",
  //       newIncome
  //     );
  //     setIncome((prevIncome) => [...prevIncome, response.data]);
  //     console.log("Added income:", response.data);
  //   } catch (error) {
  //     console.error("Error adding income:", error);
  //   }
  // };

  const updateIncome = async (updatedIncome: Income) => {
    try {
      const response = await axios.put(
        `http://localhost:3030/income/${updatedIncome.id}`,
        updatedIncome
      );
      console.log("Updated income:", response.data);
      if (response.status === 200 || response.status === 204) {
        setIncome((prevIncome) =>
          prevIncome.map((income) =>
            income.id === updatedIncome.id ? updatedIncome : income
          )
        );
      }
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  const deleteIncome = async (income: Income) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/income/${income.id}`
      );
      if (response.status === 200) {
        setIncome((prevIncome) => prevIncome.filter((e) => e.id != income.id));
      }
    } catch (error) {
      console.error("Error deleting income:", error);
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
            <IncomeGraph income={income} expenses={expenses} />
            <IncomeExpensesTable
              income={income}
              expenses={expenses}
              bills={bills}
              savings={savings}
            />
          </Box>
          <Box width={["100vw", "75vw", "50vw"]} position="relative">
            <IncomeTable
              income={income}
              selectedMonth={selectedMonth}
              onUpdatedIncome={updateIncome}
              onDeleteIncome={deleteIncome}
            />
            <Box
              width={["100%", "50%", "33%"]}
              position="absolute"
              mt="5"
              ml="5"
            >
              <AddIncome onAddIncome={addIncome} />
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

export default IncomeList;
