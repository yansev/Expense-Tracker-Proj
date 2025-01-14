import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Toast } from "@chakra-ui/react";
import { AddExpenseProps } from "../../../entities/expense/model";
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
const AddExpense: React.FC<AddExpenseProps> = ({ onAddExpense }) => {
  const [title, setTitle] = useState<string>(""); // Title of the expense
  const [month, setMonth] = useState<string>(""); // Month of the expense
  const [plannedAmount, setPlannedAmount] = useState<number>(0); // Amount for the expense
  const [actualAmount, setActualAmount] = useState<number>(0); // Amount for the expense

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      title,
      month,
      plannedAmount: plannedAmount || 0,
      actualAmount: actualAmount || 0,
    };

    const resetForm = () => {
      setTitle("");
      setMonth("");
      setPlannedAmount(0);
      setActualAmount(0);
    };

    onAddExpense(newExpense);
    Toast({
      title: "Data Added Successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    resetForm();
    onClose();
  };

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
            <form onSubmit={handleSubmit}>
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
