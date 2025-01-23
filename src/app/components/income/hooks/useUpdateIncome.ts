import { useState, useEffect } from "react";
import { Income } from "../../../../entities/model";
import { useToast } from "@chakra-ui/react";

export const useUpdateIncome = (
  income: Income,
  onUpdatedIncome: (income: Income) => void
) => {
  const [source, setSource] = useState(income?.source || "");
  const [month, setMonth] = useState(income?.month || "");
  const [amount, setAmount] = useState<number>(income?.amount || 0);

  useEffect(() => {
    if (income) {
      setSource(income.source);
      setMonth(income.month);
      setAmount(income.amount);
    }
  }, [income]);

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent, onClose: () => void) => {
    e.preventDefault();

    const updatedIncome = { ...income, source, month, amount };
    onUpdatedIncome(updatedIncome);

    console.log("Updated income:", updatedIncome);
    onUpdatedIncome(updatedIncome);
    toast({
      title: "Income updated successfully",
      description: "The income has been updated successfully",
      status: "success",
      duration: 3000,
    });
    onClose();
  };

  return {
    source,
    setSource,
    month,
    setMonth,
    amount,
    setAmount,
    handleSubmit,
  };
};
