import {
  Box,
  VStack,
  Stack,
  Button,
  useDisclosure,
  Grid,
  Textarea,
  Text,
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
    <Grid
      templateColumns={["1fr", "1fr", "2fr 1fr"]}
      templateRows={["1fr", "1fr", "1fr 1fr"]}
      gap={4}
      minH="100vh"
      w="100%"
      p={4}
    >
      <VStack spacing={6} align="stretch" w="100%">
        <Box mb={4} w="100%">
          <MonthSelector />
        </Box>

        <Stack direction={["column", "row"]} spacing={4} w="100%">
          <Box flex="1">
            <IncomeGraph income={income} expenses={expenses} />
          </Box>
          <Box flex="1">
            <IncomeExpensesTable
              income={income}
              expenses={expenses}
              bills={bills}
              savings={savingsData}
            />
          </Box>
        </Stack>

        <Box>
          <IncomeTable
            income={income}
            selectedMonth={selectedMonth}
            onUpdatedIncome={updateIncome}
            onDeleteIncome={deleteIncome}
          />
          <Box mt={4}>
            <AddIncome onAddIncome={addIncome} />
          </Box>
        </Box>

        <Box position="fixed" bottom="20px" right="20px">
          <Button onClick={onOpen} colorScheme="green">
            <AiFillCalculator />
          </Button>
          <CalcModal isOpen={isOpen} onClose={onClose} />
        </Box>
      </VStack>

      <Box
        p={4}
        border="1px solid #e2e8f0"
        borderRadius="md"
        h="fit-content"
        w="100%"
      >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Notes
        </Text>
        <Textarea
          placeholder="Add notes about your income or expenses here..."
          size="md"
          h="calc(100vh - 120px)"
        />
      </Box>
    </Grid>
  );
};

export default IncomeList;
