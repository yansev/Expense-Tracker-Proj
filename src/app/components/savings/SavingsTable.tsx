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

const SavingsTable: React.FC<SavingsTableProps> = ({
  income,
  onTotalSavingsChange,
}) => {
  const { incomeByMonth } = useSavings(income, onTotalSavingsChange);

  const { totalIncome: totalIncomeValue } = useTotalIncome(income);
  const totalIncome = Number(totalIncomeValue);
  const { totalSavings } = useTotalSavings(incomeByMonth);

  return (
    <TableContainer>
      <Table size="sm" variant="simple">
        <Thead bg="#2d3250">
          <Tr>
            <Th color="#f7f2eb">Month</Th>
            <Th color="#f7f2eb">Income</Th>
            <Th isNumeric color="#f7f2eb">
              Amount Saved
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {incomeByMonth.map((item, index) => (
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
