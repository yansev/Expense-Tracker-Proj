import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Container,
  Heading,
  Flex,
  Link,
} from "@chakra-ui/react";
import { IncomeTableProps } from "./types/IncomeTypes";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditIncome from "./EditIncome";
import DeleteIncome from "./DeleteIncome";
import { useMonth } from "../../shared/hooks/MonthContext";
import { useFilteredIncome } from "./hooks/useFilteredIncome";
import { useHandleEditIncome } from "./hooks/useHandleEditIncome";
import { useHandleDeleteIncome } from "./hooks/useHandleDeleteIncome";
import { useMonthOrder } from "../../shared/hooks/useMonthOrder";

const IncomeTable: React.FC<IncomeTableProps> = ({
  income,
  onUpdatedIncome,
  onDeleteIncome,
}) => {
  const { selectedMonth } = useMonth();
  const months = useMonthOrder();

  const filteredIncome = useFilteredIncome(income, selectedMonth).sort(
    (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
  );

  const amount = filteredIncome.reduce((sum, income) => sum + income.amount, 0);

  const { handleEditIncome, editIncome, isOpen, onClose } =
    useHandleEditIncome();
  const {
    handleDeleteClickIncome,
    handleDeleteIncome,
    deleteIncome,
    isOpenDeleteModal,
    onCloseDeleteModal,
  } = useHandleDeleteIncome(onDeleteIncome);

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Heading size="md" mb={4} textAlign="center" color="#606e52">
          Income for {selectedMonth || "Whole Year"}
        </Heading>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Source</Th>
              <Th>Month</Th>
              <Th isNumeric>Amount</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredIncome.map((income, index) => (
              <Tr key={index}>
                <Td>{income.source}</Td>
                <Td>{income.month}</Td>
                <Td isNumeric>{income.amount}</Td>
                <Td>
                  <Flex>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Edit Income"
                      onClick={() => handleEditIncome(income)}
                    >
                      <AiOutlineEdit color="#081F5C" />
                    </Link>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Delete Income"
                      onClick={() => handleDeleteClickIncome(income)}
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
              <Th isNumeric>{amount}</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
        {editIncome && (
          <EditIncome
            isOpen={isOpen}
            onClose={onClose}
            income={editIncome}
            onUpdatedIncome={onUpdatedIncome}
          />
        )}
        {deleteIncome && (
          <DeleteIncome
            isOpenDeleteIncome={isOpenDeleteModal}
            onCloseDeleteIncome={onCloseDeleteModal}
            income={deleteIncome}
            onDeleteIncome={handleDeleteIncome}
          />
        )}
      </TableContainer>
    </Container>
  );
};

export default IncomeTable;
