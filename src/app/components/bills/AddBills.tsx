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
import { AddBillsProps } from "./types/BillTypes";
import { useDisclosure } from "@chakra-ui/react";
import { useAddBill } from "./hooks/useAddBill";

const AddBills: React.FC<AddBillsProps> = ({ onAddBill }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    billTitle,
    dueDate,
    plannedAmount,
    actualAmount,
    setBillTitle,
    setDueDate,
    setPlannedAmount,
    setActualAmount,
  } = useAddBill(onAddBill);

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
            <form onSubmit={(e) => handleSubmit(e, onClose)}>
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

              <Button
                type="submit"
                backgroundColor="#606e52"
                color="#ffffff"
                mt={3}
              >
                Add Bill
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="#474747"
              color="#ffffff"
              mr={3}
              onClick={onClose}
              mt={3}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBills;
