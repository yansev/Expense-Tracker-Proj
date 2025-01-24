import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Income } from "../types/IncomeTypes";

export const useAddIncome = (onAddIncome: (income: Income) => void) => {
  const [source, setSource] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const toast = useToast();

  const resetForm = () => {
    setSource("");
    setMonth("");
    setAmount(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncome = {
      id: Date.now(),
      source,
      month,
      amount: amount || 0,
    };
    onAddIncome(newIncome);
    toast({
      title: "Data Added Successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    resetForm();
  };

  return {
    source,
    setSource,
    month,
    setMonth,
    amount,
    setAmount,
    handleSubmit,
    resetForm,
  };
};
