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

const BillsTable = () => (
  <TableContainer>
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Bill</Th>
          <Th>Planned Amount</Th>
          <Th>Actual Amount</Th>
          <Th isNumeric>Due Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td></Td>
          <Td isNumeric></Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Total</Th>
          <Th></Th>
          <Th isNumeric></Th>
          <Th isNumeric></Th>
        </Tr>
      </Tfoot>
    </Table>
  </TableContainer>
);

export default BillsTable;
