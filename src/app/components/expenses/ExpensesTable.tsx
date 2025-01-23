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
  Container,
  Heading,
} from "@chakra-ui/react";
import { ExpensesTableProps } from "../../../entities/model";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditExpense from "./EditExpenses";
import DeleteExpense from "./DeleteExpense";
import { useMonth } from "../../shared/hooks/MonthContext";
import { useTotalAmount } from "./hooks/useTotalExpenseAmount";
import { useFilterExpenses } from "./hooks/useFilterExpenses";
import { useHandleEditExpense } from "./hooks/useHandleEditExpense";
import { useHandleDeleteExpense } from "./hooks/useHandleDeleteExpense";

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  expenses,
  onUpdatedExpense,
  onDeleteExpense,
}) => {
  const { selectedMonth } = useMonth();

  const filteredExpenses = useFilterExpenses(expenses, selectedMonth);

  const formatDateToMonthName = (monthString: string) => monthString;

  // Hook for editing
  const { handleEditExpense, editExpense, isOpen, onClose } =
    useHandleEditExpense();

  // Hook for deleting
  const {
    handleDeleteClickExpense,
    handleDeleteExpense,
    deleteExpense,
    isDeleteModalOpen,
    closeDeleteModal,
  } = useHandleDeleteExpense(onDeleteExpense);

  const { totalPlannedAmount, totalExpActualAmount } =
    useTotalAmount(filteredExpenses);

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Heading size="md" mb={4} textAlign="center" color="#081F5C">
          Expenses for {selectedMonth || "Whole Year"}
        </Heading>
        <Table size="sm">
          <Thead backgroundColor="#081F5C">
            <Tr>
              <Th color="#f7f2eb">Expense</Th>
              <Th color="#f7f2eb">Month</Th>
              <Th color="#f7f2eb">Planned Amount</Th>
              <Th color="#f7f2eb">Actual Amount</Th>
              <Th color="#f7f2eb">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredExpenses.map((expense, index) => (
              <Tr key={index}>
                <Td>{expense.title}</Td>
                <Td>{formatDateToMonthName(expense.month)}</Td>
                <Td isNumeric>{expense.plannedAmount}</Td>
                <Td isNumeric>{expense.actualAmount}</Td>
                <Td>
                  <Flex>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Edit Expense"
                      onClick={() => handleEditExpense(expense)}
                    >
                      <AiOutlineEdit color="#081F5C" />
                    </Link>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Delete Expense"
                      onClick={() => handleDeleteClickExpense(expense)}
                    >
                      <AiOutlineDelete color="red" />
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
              <Th textAlign="right">{totalPlannedAmount}</Th>
              <Th textAlign="right">{totalExpActualAmount}</Th>
            </Tr>
          </Tfoot>
        </Table>
        {editExpense && (
          <EditExpense
            isOpen={isOpen}
            onClose={onClose}
            expense={editExpense}
            onUpdatedExpense={onUpdatedExpense}
          />
        )}
        {deleteExpense && (
          <DeleteExpense
            isOpenDelete={isDeleteModalOpen}
            onCloseDelete={closeDeleteModal}
            expense={deleteExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        )}
      </TableContainer>
    </Container>
  );
};

export default ExpensesTable;
