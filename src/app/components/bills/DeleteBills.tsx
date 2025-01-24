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
import { DeleteBillsProps } from "./types/BillTypes";

const DeleteBill: React.FC<DeleteBillsProps> = ({
  isOpenDeleteBill,
  onCloseDeleteBill,
  bill,
  onDeleteBill,
}) => {
  return (
    <Modal isOpen={isOpenDeleteBill} onClose={onCloseDeleteBill}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>
          Are you sure you want to delete this bill? This action cannot be
          undone.
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={() => onDeleteBill(bill)}>
            Delete
          </Button>
          <Button colorScheme="blue" onClick={onCloseDeleteBill}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBill;
