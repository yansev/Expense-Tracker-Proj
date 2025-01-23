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
import { BalanceTableProps } from "../../../entities/model";
import { useMonth } from "../../shared/hooks/MonthContext";
import { useTotalAmount } from "../expenses/hooks/useTotalExpenseAmount";
import { useTotalIncome } from "./hooks/useTotalIncome";

const IncomeExpensesTable: React.FC<BalanceTableProps> = ({
  income,
  expenses,
  bills,
  savings,
}) => {
  const { selectedMonth } = useMonth();
  const totalIncome = useTotalIncome(income);
  const { totalExpActualAmount } = useTotalAmount(expenses);

  const totalBills = bills.reduce(
    (total, bills) => total + (bills.actualAmount || 0),
    0
  );
  const totalSavings = savings.reduce(
    (total, savings) => total + (savings.amount || 0),
    0
  );

  const balance =
    totalIncome - totalExpActualAmount - totalBills - totalSavings;

  // const amount = filteredIncome.reduce((sum, income) => sum + income.amount, 0);

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
                {totalIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric>
                {totalExpActualAmount
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric>
                {totalBills.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric>
                {totalSavings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric textAlign="right" fontWeight="bold">
                {balance}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default IncomeExpensesTable;
