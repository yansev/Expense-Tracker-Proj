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
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditExpensesProps } from "../../../entities/expense/model";

const EditExpense: React.FC<EditExpensesProps> = ({
  isOpen,
  onClose,
  expenseId,
}) => {
  // const navigate = useNavigate();

  // State variables for the form fields
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("");
  const [plannedAmount, setPlannedAmount] = useState<number>(0);
  const [actualAmount, setActualAmount] = useState<number>(0);

  // Fetch the existing expense data when the component mounts
  useEffect(() => {
    if (expenseId) {
      axios.get(`/api/expenses/${expenseId}`).then((response) => {
        const expense = response.data;
        setTitle(expense.title);
        setMonth(expense.month);
        setPlannedAmount(expense.plannedAmount);
        setActualAmount(expense.actualAmount);
      });
    }
  }, [expenseId]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedExpense = { title, month, plannedAmount, actualAmount };

    axios
      .put(`/api/expenses/${expenseId}`, updatedExpense)
      .then(() => {
        alert("Expense updated successfully!");
        // navigate("/expenses");
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
      });

    onClose(); // Close the modal after successful submission
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Expense</ModalHeader>
          <ModalCloseButton />
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
                      placeholder={title}
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
                      placeholder={month}
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
                      placeholder={plannedAmount.toString()}
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
                      placeholder={actualAmount.toString()}
                    />
                  </FormControl>

                  <Button variant="ghost" type="submit" mt={4}>
                    Save Changes
                  </Button>
                </form>
              </VStack>
            </Container>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditExpense;
