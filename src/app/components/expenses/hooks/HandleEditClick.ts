import { useDisclosure } from "@chakra-ui/react";
import { Expense } from "../../../../entities/model";
import { useState } from "react";

export const useHandleEditClick = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  const handleEditClick = (expense: Expense) => {
    console.log("Edit clicked for expense:", expense);
    setEditExpense(expense);
    onOpen();
  };

  return { handleEditClick, editExpense, isOpen, onOpen, onClose };
};
