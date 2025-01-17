import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useToast,
} from "@chakra-ui/react";
import { EditExpensesProps } from "../../../entities/model";

const EditExpense: React.FC<EditExpensesProps> = ({
  isOpen,
  onClose,
  expense,
  onUpdatedExpense,
}) => {
  const [title, setTitle] = useState(expense.title);
  const [month, setMonth] = useState(expense.month);
  const [plannedAmount, setPlannedAmount] = useState<number>(
    expense.plannedAmount
  );
  const [actualAmount, setActualAmount] = useState<number>(
    expense.actualAmount
  );

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setMonth(expense.month);
      setPlannedAmount(expense.plannedAmount);
      setActualAmount(expense.actualAmount);
    }
  }, [expense]);

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedExpense = {
      ...expense,
      title,
      month,
      plannedAmount,
      actualAmount,
    };
    toast({
      title: "Data UpdatedSuccessfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onUpdatedExpense(updatedExpense);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Expense</ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>
          <Container>
            <VStack spacing={4}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Expense Title</FormLabel>
                  <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                      setPlannedAmount(parseFloat(e.target.value))
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
                      setActualAmount(parseFloat(e.target.value))
                    }
                    placeholder="Enter actual amount"
                  />
                </FormControl>

                <Button color="green" type="submit" mt={4}>
                  Save Changes
                </Button>
              </form>
            </VStack>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditExpense;
