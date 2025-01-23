import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Container,
  Heading,
  Flex,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { Bill, BillsTableProps } from "../../../entities/model";
import { useMonth } from "../../shared/hooks/MonthContext";
import { useState } from "react";
import EditBills from "./EditBills";
import DeleteBills from "./DeleteBills";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const BillsTable: React.FC<BillsTableProps> = ({
  bills,
  onUpdatedBill,
  onDeleteBill,
}) => {
  const { selectedMonth } = useMonth();

  const filteredBills =
    selectedMonth === "All" || !selectedMonth
      ? bills
      : bills.filter((bill) => {
          const billMonth = new Date(bill.dueDate)
            .toLocaleString("default", { month: "long" })
            .toLowerCase();
          return billMonth === selectedMonth.toLowerCase();
        });

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const handleEditClick = (bill: Bill) => {
    console.log("Edit clicked for bill:", bill);
    setSelectedBill(bill);
    onOpen();
  };

  const handleDeleteClick = (bill: Bill) => {
    console.log("Deleted", bill);
    setSelectedBill(bill);
    onOpenDelete();
  };

  const handleDeleteBill = (bill: Bill) => {
    onDeleteBill(bill);
    onCloseDelete();
  };

  const handlePaidStatusChange = (bill: Bill) => {
    const updatedBill = { ...bill, paid: !bill.paid };
    onUpdatedBill(updatedBill);
  };

  const totalPlanned = filteredBills.reduce(
    (sum, bill) => sum + bill.plannedAmount,
    0
  );
  const totalActual = filteredBills.reduce(
    (sum, bill) => sum + bill.actualAmount,
    0
  );

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
                    onChange={() => handlePaidStatusChange(bill)}
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
                      onClick={() => handleEditClick(bill)}
                    >
                      <AiOutlineEdit color="#081F5C" />
                    </Link>
                    <Link
                      as="button"
                      mr="10px"
                      aria-label="Delete Bill"
                      onClick={() => handleDeleteClick(bill)}
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
              <Th isNumeric>{totalPlanned}</Th>
              <Th isNumeric>{totalActual}</Th>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
        <>
          {selectedBill && (
            <>
              <EditBills
                isOpen={isOpen}
                onClose={onClose}
                bill={selectedBill}
                onUpdatedBill={onUpdatedBill}
              />
              <DeleteBills
                isOpenDeleteBill={isOpenDelete}
                onCloseDeleteBill={onCloseDelete}
                bill={selectedBill}
                onDeleteBill={handleDeleteBill}
              />
            </>
          )}
        </>
      </TableContainer>
    </Container>
  );
};

export default BillsTable;
