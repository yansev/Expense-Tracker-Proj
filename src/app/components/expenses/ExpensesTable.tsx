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
import { ExpensesTableProps } from "./types/ExpensesTypes";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditExpense from "./EditExpenses";
import DeleteExpense from "./DeleteExpense";
import { useMonth } from "../../shared/hooks/MonthContext";
import { useTotalAmount } from "./hooks/useTotalExpenseAmount";
import { useFilterExpenses } from "./hooks/useFilterExpenses";
import { useHandleEditExpense } from "./hooks/useHandleEditExpense";
import { useHandleDeleteExpense } from "./hooks/useHandleDeleteExpense";
import { useMonthOrder } from "../../shared/hooks/useMonthOrder";

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  expenses,
  onUpdatedExpense,
  onDeleteExpense,
}) => {
  const { selectedMonth } = useMonth();
  const months = useMonthOrder();

  const filteredExpenses = useFilterExpenses(expenses, selectedMonth).sort(
    (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
  );

  const formatDateToMonthName = (monthString: string) => monthString;

  const { handleEditExpense, editExpense, isOpen, onClose } =
    useHandleEditExpense();

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
        <Heading size="md" mb={4} textAlign="center" color="#606e52">
          Expenses for {selectedMonth || "Whole Year"}
        </Heading>
        <Table size="sm">
          <Thead backgroundColor="#606e52">
            <Tr>
              <Th color="#ffffff">Expense</Th>
              <Th color="#ffffff">Month</Th>
              <Th color="#ffffff">Planned Amount</Th>
              <Th color="#ffffff">Actual Amount</Th>
              <Th color="#ffffff">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredExpenses.map((expense, index) => (
              <Tr key={index}>
                <Td>{expense.title}</Td>
                <Td>{formatDateToMonthName(expense.month)}</Td>
                <Td isNumeric>
                  {expense.plannedAmount
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Td>
                <Td isNumeric>
                  {expense.actualAmount
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Td>
                <Td>
                  <Flex>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Edit Expense"
                      onClick={() => handleEditExpense(expense)}
                    >
                      <AiOutlineEdit color="#606e52" />
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
              <Th textAlign="right">
                {totalPlannedAmount
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Th>
              <Th textAlign="right">
                {totalExpActualAmount
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Th>
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
