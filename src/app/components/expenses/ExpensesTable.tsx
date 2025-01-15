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
  Container,
  Heading,
} from "@chakra-ui/react";
import { Expense, ExpensesTableProps } from "../../../entities/expense/model";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import EditExpense from "./EditExpenses";
import DeleteExpense from "./DeleteExpense";

const ExpensesTable: React.FC<ExpensesTableProps> = ({
  expenses,
  onUpdatedExpense,
  onDeleteExpense,
}) => {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const handleEditClick = (expense: Expense) => {
    console.log("Edit clicked for expense:", expense);
    setSelectedExpense(expense);
    onOpen();
  };

  const handleDeleteClick = (expense: Expense) => {
    console.log("Deleted", expense);
    setSelectedExpense(expense);
    onOpenDelete();
  };

  const handleDeleteExpense = (expense: Expense) => {
    onDeleteExpense(expense);
    onCloseDelete();
  };

  const formatDateToMonthName = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("default", { month: "long" });
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
    <Container maxW="container.xl">
      <TableContainer>
        <Heading size="md" mb={4} textAlign="center" color="#081F5C">
          Expenses
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
            {expenses.map((expense, index) => (
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
                      onClick={() => handleEditClick(expense)}
                    >
                      <AiOutlineEdit color="#081F5C" />
                    </Link>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Delete Expense"
                      onClick={() => handleDeleteClick(expense)}
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
              <Th textAlign="right">{totalPlanned}</Th>
              <Th textAlign="right">{totalActual}</Th>
            </Tr>
          </Tfoot>
        </Table>
        {selectedExpense && (
          <>
            <EditExpense
              isOpen={isOpen}
              onClose={onClose}
              expense={selectedExpense}
              onUpdatedExpense={onUpdatedExpense}
            />
            <DeleteExpense
              isOpenDelete={isOpenDelete}
              onCloseDelete={onCloseDelete}
              expense={selectedExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          </>
        )}
      </TableContainer>
    </Container>
  );
};

export default ExpensesTable;
