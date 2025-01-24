import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { AddExpenseProps } from "./types/ExpensesTypes";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import useAddExpense from "./hooks/useAddExpense";
const AddExpense: React.FC<AddExpenseProps> = ({ onAddExpense }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    title,
    setTitle,
    month,
    setMonth,
    plannedAmount,
    setPlannedAmount,
    actualAmount,
    setActualAmount,
    handleSubmit,
  } = useAddExpense(onAddExpense);

  return (
    <>
      <Button onClick={onOpen}>
        <SmallAddIcon /> Add Expense
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Expense</ModalHeader>
          <ModalCloseButton color="red" />
          <ModalBody>
            <form
              onSubmit={(e) => {
                handleSubmit(e, onClose); // Pass onClose to handleSubmit
              }}
            >
              <FormControl>
                <FormLabel>Expense Title</FormLabel>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value || "")}
                  placeholder="Enter expense title"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Month</FormLabel>
                <Select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="Select month"
                  required
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Planned Amount</FormLabel>
                <Input
                  type="number"
                  id="plannedAmount"
                  value={plannedAmount}
                  onChange={(e) =>
                    setPlannedAmount(parseFloat(e.target.value) || 0)
                  }
                  placeholder="Enter planned amount"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Actual Amount</FormLabel>
                <Input
                  type="number"
                  id="actualAmount"
                  value={actualAmount}
                  onChange={(e) =>
                    setActualAmount(parseFloat(e.target.value) || 0)
                  }
                  placeholder="Enter actual amount"
                />
              </FormControl>

              <Button type="submit" colorScheme="green" mt={3}>
                Add Expense
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} mt={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddExpense;
