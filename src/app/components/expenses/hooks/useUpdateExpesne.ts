import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Expense } from "../types/ExpensesTypes";

const useUpdateExpense = (
  expense: Expense,
  onUpdatedExpense: (expense: Expense) => void
) => {
  const [title, setTitle] = useState<string>(expense.title);
  const [month, setMonth] = useState<string>(expense.month);
  const [plannedAmount, setPlannedAmount] = useState<number>(
    expense.plannedAmount
  );
  const [actualAmount, setActualAmount] = useState<number>(
    expense.actualAmount
  );

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setMonth(expense.month);
      setPlannedAmount(expense.plannedAmount);
      setActualAmount(expense.actualAmount);
    }
  }, [expense]);

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedExpense = {
      ...expense,
      title,
      month,
      plannedAmount,
      actualAmount,
    };
    toast({
      title: "Data UpdatedSuccessfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onUpdatedExpense(updatedExpense);
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
  };
};

export default useUpdateExpense;
