import { Button, FormLabel } from "@chakra-ui/react";
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
import { AddBillsProps } from "../../../entities/model";
import { useDisclosure, useToast } from "@chakra-ui/react";

const AddBills: React.FC<AddBillsProps> = ({ onAddBill }) => {
  const [billTitle, setBillTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [plannedAmount, setPlannedAmount] = useState<number>(0);
  const [actualAmount, setActualAmount] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Parse the dueDate and convert the month to a string
    // const date = new Date(dueDate);
    // const monthNames = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    // const formattedDueDate = monthNames[date.getMonth()];

    const newBill = {
      id: Date.now(),
      billTitle: billTitle,
      plannedAmount: plannedAmount || 0,
      actualAmount: actualAmount || 0,
      dueDate: dueDate,
      paid: false,
      // dueDate: formattedDueDate, // Use only the month
    };

    const resetForm = () => {
      setBillTitle("");
      setDueDate("");
      setPlannedAmount(0);
      setActualAmount(0);
    };

    onAddBill(newBill);
    toast({
      title: "Bill Added Successfully!",
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
        <SmallAddIcon /> Add Bill
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Bill</ModalHeader>
          <ModalCloseButton color="red" />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Bill Title</FormLabel>
                <Input
                  type="text"
                  id="source"
                  value={billTitle}
                  onChange={(e) => setBillTitle(e.target.value || "")}
                  placeholder="Enter bill title"
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
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </FormControl>

              <Button type="submit" colorScheme="green" mt={3}>
                Add Bill
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

export default AddBills;
