import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Heading,
} from "@chakra-ui/react";
import { BalanceTableProps } from "../../shared/types/types";
import { useMonth } from "../../shared/hooks/MonthContext";
import { useTotalAmount } from "../expenses/hooks/useTotalExpenseAmount";
import { useTotalIncome } from "./hooks/useTotalIncome";
import { useTotalBillsAmount } from "../bills/hooks/useTotalBillsAmount";
import { useTotalSavings } from "../savings/hooks/useTotalSavings";
import { useFilteredIncome } from "./hooks/useFilteredIncome";
import { useFilterExpenses } from "../expenses/hooks/useFilterExpenses";
import { useFilteredBills } from "../bills/hooks/useFilteredBills";

const IncomeExpensesTable: React.FC<BalanceTableProps> = ({
  income,
  expenses,
  bills,
}) => {
  const { selectedMonth } = useMonth();

  // Apply filtering based on the selected month
  const filteredIncome = useFilteredIncome(income, selectedMonth);
  const filteredExpenses = useFilterExpenses(expenses, selectedMonth);
  const filteredBills = useFilteredBills(bills, selectedMonth);

  const { totalIncome: totalIncomeValue } = useTotalIncome(filteredIncome);
  const { totalExpActualAmount } = useTotalAmount(filteredExpenses);
  const { totalSavings } = useTotalSavings(filteredIncome);
  const { totalActualBills } = useTotalBillsAmount(filteredBills);

  const balance =
    totalIncomeValue - totalExpActualAmount - totalActualBills - totalSavings;

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Heading size="md" mb={4} textAlign="center" color="#081F5C">
          Income for {selectedMonth || "Whole Year"}
        </Heading>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th isNumeric>Income</Th>
              <Th isNumeric>Expenses</Th>
              <Th isNumeric>Bills</Th>
              <Th isNumeric>Savings</Th>
              <Th isNumeric textAlign="right" fontWeight="bold">
                Balance
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td isNumeric>
                {totalIncomeValue
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric>
                {totalExpActualAmount
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric>
                {totalActualBills
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric>
                {totalSavings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric textAlign="right" fontWeight="bold">
                {balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default IncomeExpensesTable;
