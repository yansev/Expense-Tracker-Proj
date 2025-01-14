import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { ExpensesTableProps } from "../../entities/expense/model";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import EditExpense from "../components/expenses/EditExpenses";

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses }) => {
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = (id: string) => {
    setSelectedExpenseId(id);
    onOpen();
  };

  const totalPlanned = expenses.reduce(
    (sum, expense) => sum + expense.plannedAmount,
    0
  );
  const totalActual = expenses.reduce(
    (sum, expense) => sum + expense.actualAmount,
    0
  );

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Expense</Th>
            <Th>Month</Th>
            <Th>Planned Amount</Th>
            <Th>Actual Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses.map((expense, index) => (
            <Tr key={index}>
              <Td>{expense.title}</Td>
              <Td>{expense.month}</Td>
              <Td isNumeric>{expense.plannedAmount}</Td>
              <Td isNumeric>{expense.actualAmount}</Td>
              <Td>
                <Flex>
                  <Link
                    as="button"
                    mr="10px"
                    aria-label="Edit Expense"
                    onClick={() => handleEditClick(expense.id.toString())}
                  >
                    <AiOutlineEdit />
                  </Link>
                  <Link href={`/expenses/${expense.id}/delete`} mr="10px">
                    <AiOutlineDelete />
                  </Link>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total</Th>
            <Th></Th>
            <Th>{totalPlanned}</Th>
            <Th>{totalActual}</Th>
          </Tr>
        </Tfoot>
      </Table>
      {selectedExpenseId && (
        <EditExpense
          isOpen={isOpen}
          onClose={onClose}
          expenseId={selectedExpenseId}
        />
      )}
    </TableContainer>
  );
};

export default ExpensesTable;
