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
      <TableContainer minWidth="100%">
        <Heading size="md" mb={4} textAlign="center" color="#606e52">
          Income for {selectedMonth || "Whole Year"}
        </Heading>
        <Table size="sm">
          <Thead backgroundColor="#606e52">
            <Tr>
              <Th isNumeric color="#ffffff">
                Income
              </Th>
              <Th isNumeric color="#ffffff">
                Expenses
              </Th>
              <Th isNumeric color="#ffffff">
                Bills
              </Th>
              <Th isNumeric color="#ffffff">
                Savings
              </Th>
              <Th isNumeric textAlign="right" fontWeight="bold" color="#ffffff">
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
