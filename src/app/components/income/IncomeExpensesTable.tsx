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
import { IncomeExpensesTableProps } from "../../../entities/model";
import { useMonth } from "../MonthContext";

const IncomeExpensesTable: React.FC<IncomeExpensesTableProps> = ({
  income,
  expenses,
}) => {
  const { selectedMonth } = useMonth();

  const totalIncome = income.reduce(
    (total, income) => total + (income.amount || 0),
    0
  );
  const totalExpenses =
    expenses?.reduce((total, expense) => total + expense.actualAmount, 0) || 0;

  const balance = totalIncome - totalExpenses;

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
              <Td isNumeric>{totalIncome}</Td>
              <Td isNumeric>{totalExpenses}</Td>
              <Td isNumeric>1000</Td>
              <Td isNumeric>1000</Td>
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
