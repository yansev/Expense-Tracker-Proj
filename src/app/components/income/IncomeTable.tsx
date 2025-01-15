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
  useDisclosure,
} from "@chakra-ui/react";
import { Income, IncomeTableProps } from "../../../entities/expense/model";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import EditIncome from "./EditIncome";
import DeleteIncome from "./DeleteIncome";

const IncomeTable: React.FC<IncomeTableProps> = ({
  income,
  onUpdatedIncome,
  onDeleteIncome,
}) => {
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteIncome,
    onOpen: onOpenDeleteIncome,
    onClose: onCloseDeleteIncome,
  } = useDisclosure();

  const handleEditClick = (income: Income) => {
    setSelectedIncome(income);
    onOpen();
  };

  const handleDeleteClick = (income: Income) => {
    console.log("Deleted", income);
    setSelectedIncome(income);
    onOpenDeleteIncome();
  };

  const handleDeleteIncome = (income: Income) => {
    onDeleteIncome(income);
    onCloseDeleteIncome();
  };

  const amount = income.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Heading size="md" mb={4} textAlign="center" color="#081F5C">
          Income
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
            {income.map((income, index) => (
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
                      onClick={() => handleEditClick(income)}
                    >
                      <AiOutlineEdit color="#081F5C" />
                    </Link>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Delete Income"
                      onClick={() => handleDeleteClick(income)}
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
        {selectedIncome && (
          <>
            <EditIncome
              isOpen={isOpen}
              onClose={onClose}
              income={selectedIncome}
              onUpdatedIncome={onUpdatedIncome}
            />
            <DeleteIncome
              isOpenDeleteIncome={isOpenDeleteIncome}
              onCloseDeleteIncome={onCloseDeleteIncome}
              income={selectedIncome}
              onDeleteIncome={handleDeleteIncome}
            />
          </>
        )}
      </TableContainer>
    </Container>
  );
};

export default IncomeTable;
