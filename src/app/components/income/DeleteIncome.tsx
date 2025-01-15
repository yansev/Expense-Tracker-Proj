import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { DeleteIncomeProps } from "../../../entities/expense/model";

const DeleteIncome: React.FC<DeleteIncomeProps> = ({
  isOpenDeleteIncome,
  onCloseDeleteIncome,
  income,
  onDeleteIncome,
}) => {
  return (
    <Modal isOpen={isOpenDeleteIncome} onClose={onCloseDeleteIncome}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>
          Are you sure you want to delete this expense? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => onDeleteIncome(income)}
          >
            Delete
          </Button>
          <Button colorScheme="blue" onClick={onCloseDeleteIncome}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteIncome;
