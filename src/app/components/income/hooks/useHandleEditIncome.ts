import { useState } from "react";
import { Income } from "../types/IncomeTypes";
import { useDisclosure } from "@chakra-ui/react";

export const useHandleEditIncome = () => {
  const [editIncome, setEditIncome] = useState<Income | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditIncome = (income: Income) => {
    console.log("Editing income:", income);
    setEditIncome(income);
    onOpen();
  };

  return { editIncome, isOpen, onOpen, onClose, handleEditIncome };
};
