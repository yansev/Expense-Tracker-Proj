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
  useToast,
} from "@chakra-ui/react";
import { EditBillsProps } from "../../../entities/model";

const EditBill: React.FC<EditBillsProps> = ({
  isOpen,
  onClose,
  bill,
  onUpdatedBill,
}) => {
  const [billTitle, setBillTitle] = useState(bill.billTitle);
  const [dueDate, setDueDate] = useState(bill.dueDate);
  const [plannedAmount, setPlannedAmount] = useState<number>(
    bill.plannedAmount
  );
  const [actualAmount, setActualAmount] = useState<number>(bill.actualAmount);

  useEffect(() => {
    if (bill) {
      setBillTitle(bill.billTitle);
      setDueDate(bill.dueDate);
      setPlannedAmount(bill.plannedAmount);
      setActualAmount(bill.actualAmount);
    }
  }, [bill]);

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBill = {
      ...bill,
      billTitle,
      dueDate,
      plannedAmount,
      actualAmount,
    };
    toast({
      title: "Data UpdatedSuccessfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onUpdatedBill(updatedBill);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Bill</ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>
          <Container>
            <VStack spacing={4}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <FormLabel>Bill Title</FormLabel>
                  <Input
                    type="text"
                    id="billTitle"
                    value={billTitle}
                    onChange={(e) => setBillTitle(e.target.value)}
                    placeholder="Enter bill title"
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
                    placeholder="Select due date"
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

export default EditBill;
