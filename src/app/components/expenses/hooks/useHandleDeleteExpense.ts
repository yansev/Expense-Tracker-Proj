import { useState } from "react";
import { Expense } from "../types/ExpensesTypes";
import { useDisclosure } from "@chakra-ui/react";

export const useHandleDeleteExpense = (
  onDeleteExpense: (expense: Expense) => void
) => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const [deleteExpense, setDeleteExpense] = useState<Expense | null>(null);

  const handleDeleteClickExpense = (expense: Expense) => {
    setDeleteExpense(expense);
    openDeleteModal();
  };

  const handleDeleteExpense = () => {
    if (deleteExpense) {
      onDeleteExpense(deleteExpense);
      setDeleteExpense(null);
    }
    closeDeleteModal();
  };

  return {
    handleDeleteClickExpense,
    handleDeleteExpense,
    deleteExpense,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
  };
};
