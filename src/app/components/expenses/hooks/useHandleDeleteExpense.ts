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
    console.log("Deleting expense:", expense);
    setDeleteExpense(expense);
    openDeleteModal();
  };

  const handleDeleteExpense = () => {
    if (deleteExpense) {
      console.log("Confirming delete for expense:", deleteExpense);
      onDeleteExpense(deleteExpense); // Trigger the delete action
      setDeleteExpense(null); // Reset the state
    }
    closeDeleteModal(); // Close the modal
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
