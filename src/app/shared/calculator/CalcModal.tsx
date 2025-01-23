import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import Calculator from "./Calculator";

export default function CalcModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="rgba(0,0,0,0.5" />
      <ModalContent bg="transparent" boxShadow="none">
        <ModalBody>
          <Calculator />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
