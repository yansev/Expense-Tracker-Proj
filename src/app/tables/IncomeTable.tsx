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

const IncomeTable = () => (
  <TableContainer>
    <Table size="sm">
      <Thead>
        <Tr>
          <Th>Source</Th>
          <Th>Month</Th>
          <Th isNumeric>Planned Amount</Th>
          <Th isNumeric>Actual Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td></Td>
          <Td></Td>
          <Td isNumeric></Td>
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

export default IncomeTable;
