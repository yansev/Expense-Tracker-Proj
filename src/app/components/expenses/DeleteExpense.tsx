import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
// import { useDisclosure } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";
import { DeleteExpensesProps } from "../../../entities/model";

const DeleteExpense: React.FC<DeleteExpensesProps> = ({
  isOpenDelete,
  onCloseDelete,
  expense,
  onDeleteExpense,
}) => {
  return (
    <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
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
            onClick={() => onDeleteExpense(expense)}
          >
            Delete
          </Button>
          <Button colorScheme="blue" onClick={onCloseDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteExpense;
