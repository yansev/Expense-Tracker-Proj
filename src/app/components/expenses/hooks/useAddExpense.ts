import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Expense } from "../types/ExpensesTypes";

const useAddExpense = (onAddExpense: (expense: Expense) => void) => {
  const [title, setTitle] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [plannedAmount, setPlannedAmount] = useState<number>(0);
  const [actualAmount, setActualAmount] = useState<number>(0);
  const toast = useToast();

  const resetForm = () => {
    setTitle("");
    setMonth("");
    setPlannedAmount(0);
    setActualAmount(0);
  };

  const handleSubmit = (e: React.FormEvent, onClose: () => void) => {
    e.preventDefault();

    const newExpense: Expense = {
      id: Date.now(),
      title,
      month: new Date(month + "-01").toLocaleString("default", {
        month: "long",
      }),
      plannedAmount: plannedAmount || 0,
      actualAmount: actualAmount || 0,
    };

    console.log("Submitting new expense:", newExpense);
    onAddExpense(newExpense);
    toast({
      title: "Data Added Successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    resetForm();
    onClose();
  };

  return {
    title,
    setTitle,
    month,
    setMonth,
    plannedAmount,
    setPlannedAmount,
    actualAmount,
    setActualAmount,
    handleSubmit,
    resetForm,
  };
};

export default useAddExpense;
