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
import { useState, useEffect } from "react";
import { MonthlyData, SavingsTableProps } from "../../../entities/model";

const SavingsTable: React.FC<SavingsTableProps> = ({
  income,
  onTotalSavingsChange,
}) => {
  const [incomeByMonth, setIncomeByMonth] = useState<MonthlyData[]>([]);

  const calculateSavings = (income: number, percentage: number) => {
    return (income * percentage) / 100;
  };

  const formatMonthToLongName = (monthString: string) => {
    const [year, month] = monthString.split("-");
    const date = new Date(`${year}-${month}-01`);
    return date.toLocaleString("default", { month: "long" });
  };

  useEffect(() => {
    const savingsPercentage = 20; // Fixed savings percentage
    // Map through the income data and calculate savings for each month
    const updatedIncomeByMonth = (income || []).map((data) => ({
      month: formatMonthToLongName(data.month),
      income: data.amount,
      savings: calculateSavings(data.amount, savingsPercentage),
      expenses: 0,
      bills: 0,
    }));

    setIncomeByMonth(updatedIncomeByMonth);
    const totalSavings = updatedIncomeByMonth.reduce(
      (sum, item) => sum + item.savings,
      0
    );
    onTotalSavingsChange(totalSavings);
  }, [income, onTotalSavingsChange]);

  const totalIncome = incomeByMonth.reduce((sum, item) => sum + item.income, 0);
  const totalSavings = incomeByMonth.reduce(
    (sum, item) => sum + item.savings,
    0
  );

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
