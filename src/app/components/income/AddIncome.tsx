import { Button, FormLabel, Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { AddIncomeProps } from "../../../entities/model";
import { useDisclosure, useToast } from "@chakra-ui/react";

const AddIncome: React.FC<AddIncomeProps> = ({ onAddIncome }) => {
  const [source, setSource] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newIncome = {
      id: Date.now(),
      source,
      month,
      amount: amount || 0,
    };

    const resetForm = () => {
      setSource("");
      setMonth("");
      setAmount(0);
    };

    onAddIncome(newIncome);
    toast({
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
        <SmallAddIcon /> Add Income
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Income</ModalHeader>
          <ModalCloseButton color="red" />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Income Source</FormLabel>
                <Input
                  type="text"
                  id="source"
                  value={source}
                  onChange={(e) => setSource(e.target.value || "")}
                  placeholder="Enter income source"
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
                  id="Amount"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter amount"
                  required
                />
              </FormControl>

              <Button type="submit" colorScheme="green" mt={3}>
                Add Income
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

export default AddIncome;
