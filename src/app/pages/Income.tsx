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
import CalcModal from "../shared/calculator/CalcModal";
import { AiFillCalculator } from "react-icons/ai";
import AddIncome from "../components/income/AddIncome";
import IncomeGraph from "../components/income/IncomeGraph";
import { useMonth } from "../shared/hooks/MonthContext";
import MonthSelector from "../shared/MonthSelector";
import IncomeExpensesTable from "../components/income/IncomeExpensesTable";
import useIncome from "./hooks/useIncome";
import useExpenses from "./hooks/useExpenses";
import useBills from "./hooks/useBills";
import useSavings from "./hooks/useSavings";

const IncomeList: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { income, addIncome, updateIncome, deleteIncome } = useIncome();
  const { expenses } = useExpenses();
  const { bills } = useBills();
  const { savingsData } = useSavings();
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
            <IncomeGraph income={income} expenses={expenses} />
            <IncomeExpensesTable
              income={income}
              expenses={expenses}
              bills={bills}
              savings={savingsData}
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
