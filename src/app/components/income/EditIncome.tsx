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
} from "@chakra-ui/react";
import { EditIncomeProps } from "../../../entities/expense/model";

const EditIncome: React.FC<EditIncomeProps> = ({
  isOpen,
  onClose,
  income,
  onUpdatedIncome,
}) => {
  const [source, setSource] = useState(income.source);
  const [month, setMonth] = useState(income.month);
  const [amount, setAmount] = useState<number>(income.amount);

  useEffect(() => {
    if (income) {
      setSource(income.source);
      setMonth(income.month);
      setAmount(income.amount);
    }
  }, [income]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedIncome = {
      ...income,
      source,
      month,
      amount,
    };
    onUpdatedIncome(updatedIncome);
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
                  <FormLabel>Expense Source</FormLabel>
                  <Input
                    type="text"
                    id="title"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Enter expense title"
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Month</FormLabel>
                  <Input
                    type="month"
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="Month"
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Planned Amount</FormLabel>
                  <Input
                    type="number"
                    id="plannedAmount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Enter planned amount"
                    required
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

export default EditIncome;
