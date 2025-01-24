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
  Checkbox,
} from "@chakra-ui/react";
import { BillsTableProps } from "./types/BillTypes";
import { useMonth } from "../../shared/hooks/MonthContext";
import EditBills from "./EditBills";
import DeleteBills from "./DeleteBills";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useFilteredBills } from "./hooks/useFilteredBills";
import { useEditBills } from "./hooks/useEditBills";
import { useDeleteBill } from "./hooks/useDeleteBill";
import { useBillStatusChange } from "./hooks/useBillStatusChange";
import { useTotalBillsAmount } from "./hooks/useTotalBillsAmount";
const BillsTable: React.FC<BillsTableProps> = ({
  bills,
  onUpdatedBill,
  onDeleteBill,
}) => {
  const { selectedMonth } = useMonth();

  const filteredBills = useFilteredBills(bills, selectedMonth);

  const { handleEditBill, editBill, isOpen, onClose } = useEditBills();

  const {
    handleDeleteClickBill,
    handleDeleteBill,
    deleteBill,
    isDeleteModalOpen,
    closeDeleteModal,
  } = useDeleteBill(onDeleteBill);

  const { updatedBill } = useBillStatusChange(onUpdatedBill);

  const { totalPlannedBills, totalActualBills } =
    useTotalBillsAmount(filteredBills);

  return (
    <Container maxW="container.xl">
      <TableContainer>
        <Heading size="md" mb={4} textAlign="center" color="#081F5C">
          Bills for {selectedMonth || "Whole Year"}
        </Heading>
        <Table size="sm">
          <Thead backgroundColor="#081F5C">
            <Tr>
              <Th color="#f7f2eb">Status</Th>
              <Th color="#f7f2eb">Bill</Th>
              <Th color="#f7f2eb">Planned Amount</Th>
              <Th color="#f7f2eb">Actual Amount</Th>
              <Th color="#f7f2eb">Due Date</Th>
              <Th color="#f7f2eb">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBills.map((bill, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox
                    isChecked={bill.paid}
                    onChange={() => updatedBill(bill)}
                  >
                    {bill.paid ? "Paid" : "Not Paid"}
                  </Checkbox>
                </Td>
                <Td>{bill.billTitle}</Td>
                <Td isNumeric>{bill.plannedAmount}</Td>
                <Td isNumeric>{bill.actualAmount}</Td>
                <Td>{new Date(bill.dueDate).toLocaleDateString()}</Td>{" "}
                {/* Display full date */}
                <Td>
                  <Flex>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Edit Bill"
                      onClick={() => handleEditBill(bill)}
                    >
                      <AiOutlineEdit color="#081F5C" />
                    </Link>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Delete Bill"
                      onClick={() => handleDeleteClickBill(bill)}
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
              <Th isNumeric>{totalPlannedBills}</Th>
              <Th isNumeric>{totalActualBills}</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
        {editBill && (
          <EditBills
            isOpen={isOpen}
            onClose={onClose}
            bill={editBill}
            onUpdatedBill={onUpdatedBill}
          />
        )}
        {deleteBill && (
          <DeleteBills
            isOpenDeleteBill={isDeleteModalOpen}
            onCloseDeleteBill={closeDeleteModal}
            bill={deleteBill}
            onDeleteBill={handleDeleteBill}
          />
        )}
      </TableContainer>
    </Container>
  );
};

export default BillsTable;
