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
import ActualVsPlannedExpenses from "../charts/ExpensesChart";
import CalcModal from "../components/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";
import { useState } from "react";
import { Income } from "../../entities/expense/model";
import AddIncome from "../components/income/AddIncome";

const ExpensesList: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [income, setIncome] = useState<Income[]>([]);

  const addIncome = (newIncome: Income) => {
    console.log("Adding income:", newIncome);
    setIncome((prevIncome) => [...prevIncome, newIncome]);
  };

  const updateIncome = (updatedIncome: Income) => {
    setIncome((prevIncome) =>
      prevIncome.map((income) =>
        income.id === updatedIncome.id ? updatedIncome : income
      )
    );
  };

  const deleteIncome = (income: Income) => {
    setIncome((prevIncome) => prevIncome.filter((e) => e.id != income.id));
  };

  return (
    <Container maxW="container.xl" p={[1, 2, 3]}>
      <VStack p={[1, 2, 3]} align="center">
        <Stack
          direction={["column", "column", "row"]}
          mt={[1, 2, 3]}
          mb={[1, 2, 3]}
          spacing={[1, 2, 3]}
        >
          <Box width={["100vw", "75vw", "50vw"]}>
            <ActualVsPlannedExpenses />
          </Box>
          <Box width={["100vw", "75vw", "50vw"]} position="relative">
            <IncomeTable
              income={income}
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

export default ExpensesList;
