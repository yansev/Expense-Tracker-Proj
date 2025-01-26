import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { SavingsTableProps } from "./types/SavingsTypes";
import { useSavings } from "./hooks/useSavings";
import { useTotalIncome } from "../income/hooks/useTotalIncome";
import { useTotalSavings } from "./hooks/useTotalSavings";
import { useMonthOrder } from "../../shared/hooks/useMonthOrder";

const SavingsTable: React.FC<SavingsTableProps> = ({
  income,
  onTotalSavingsChange,
}) => {
  const { incomeByMonth } = useSavings(income, onTotalSavingsChange);

  const months = useMonthOrder();

  const sortedSavings = incomeByMonth.sort(
    (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
  );

  const { totalIncome: totalIncomeValue } = useTotalIncome(income);
  const totalIncome = Number(totalIncomeValue);
  const { totalSavings } = useTotalSavings(income);

  return (
    <TableContainer>
      <Table size="sm" variant="simple">
        <Thead bg="#606e52">
          <Tr>
            <Th color="#ffffff">Month</Th>
            <Th color="#ffffff">Income</Th>
            <Th color="#ffffff">Amount Saved</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedSavings.map((item, index) => (
            <Tr key={index}>
              <Td>{item.month}</Td>
              <Td isNumeric>
                {item.income.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
              <Td isNumeric>
                {item.savings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Td isNumeric>
              {totalIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Td>
            <Td isNumeric>
              {totalSavings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default SavingsTable;
