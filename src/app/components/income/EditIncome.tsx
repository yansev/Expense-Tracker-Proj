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
} from "@chakra-ui/react";
import { EditIncomeProps } from "../../../entities/model";
const EditIncome: React.FC<EditIncomeProps> = ({
  income,
  isOpen,
  onClose,
  onUpdatedIncome,
}) => {
  const [source, setSource] = useState(income?.source || "");
  const [month, setMonth] = useState(income?.month || "");
  const [amount, setAmount] = useState<number>(income?.amount || 0);

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
      month: new Date(month + "-01").toLocaleString("en-US", {
        month: "long",
      }),
      amount,
    };
    console.log("Updated income:", updatedIncome);
    onUpdatedIncome(updatedIncome);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Income</ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>
          <Container>
            <VStack spacing={4}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Income Source</FormLabel>
                  <Input
                    type="text"
                    id="title"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Enter income title"
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
                  <FormLabel>Amount</FormLabel>
                  <Input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    placeholder="Enter amount"
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
