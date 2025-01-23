import React from "react";
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
import { EditExpensesProps } from "../../../entities/model";
import useUpdateExpense from "./hooks/useUpdateExpesne";
import useHandleSubmitWrapper from "../../shared/hooks/HandleSubmitWrapper";
const EditExpense: React.FC<EditExpensesProps> = ({
  isOpen,
  onClose,
  expense,
  onUpdatedExpense,
}) => {
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
  } = useUpdateExpense(expense, onUpdatedExpense);

  const { handleSubmitWrapper } = useHandleSubmitWrapper(handleSubmit, onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Expense</ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>
          <Container>
            <VStack spacing={4}>
              <form onSubmit={handleSubmitWrapper}>
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
