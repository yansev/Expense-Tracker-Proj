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
import { EditBillsProps } from "./types/BillTypes";
import { useUpdateBill } from "./hooks/useUpdateBill";
import useHandleSubmitWrapper from "../../shared/hooks/HandleSubmitWrapper";

const EditBill: React.FC<EditBillsProps> = ({
  isOpen,
  onClose,
  bill,
  onUpdatedBill,
}) => {
  const {
    billTitle,
    setBillTitle,
    dueDate,
    setDueDate,
    plannedAmount,
    setPlannedAmount,
    actualAmount,
    setActualAmount,
    handleSubmit,
  } = useUpdateBill(bill, onUpdatedBill);

  const { handleSubmitWrapper } = useHandleSubmitWrapper(handleSubmit, onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Bill</ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>
          <Container>
            <VStack spacing={4}>
              <form onSubmit={handleSubmitWrapper}>
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
