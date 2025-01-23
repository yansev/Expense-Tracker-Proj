import { useState } from "react";
import { Income } from "../types/IncomeTypes";
import { useDisclosure } from "@chakra-ui/react";

export const useHandleDeleteIncome = (
  onDeleteIncome: (income: Income) => void
) => {
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  const [deleteIncome, setDeleteIncome] = useState<Income | null>(null);

  const handleDeleteClickIncome = (income: Income) => {
    setDeleteIncome(income);
    onOpenDeleteModal();
  };

  const handleDeleteIncome = () => {
    if (deleteIncome) {
      console.log("Deleting income:", deleteIncome);
      onDeleteIncome(deleteIncome);
      setDeleteIncome(null);
    }
    onCloseDeleteModal();
  };

  return {
    deleteIncome,
    isOpenDeleteModal,
    onOpenDeleteModal,
    onCloseDeleteModal,
    handleDeleteClickIncome,
    handleDeleteIncome,
  };
};
