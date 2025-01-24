import { useState } from "react";
import { Bill } from "../types/BillTypes";
import { useDisclosure } from "@chakra-ui/react";

export const useDeleteBill = (onDeleteBill: (bill: Bill) => void) => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();
  const [deleteBill, setDeleteBill] = useState<Bill | null>(null);

  const handleDeleteClickBill = (bill: Bill) => {
    console.log("Deleted", bill);
    setDeleteBill(bill);
    openDeleteModal();
  };

  const handleDeleteBill = () => {
    if (deleteBill) {
      onDeleteBill(deleteBill);
      setDeleteBill(null);
    }
    closeDeleteModal();
  };

  return {
    handleDeleteClickBill,
    handleDeleteBill,
    deleteBill,
    isDeleteModalOpen,
    closeDeleteModal,
  };
};
