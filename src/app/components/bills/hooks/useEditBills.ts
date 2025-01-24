import { useState } from "react";
import { Bill } from "../types/BillTypes";
import { useDisclosure } from "@chakra-ui/react";

export const useEditBills = () => {
  const [editBill, setEditBill] = useState<Bill | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditBill = (bill: Bill) => {
    console.log("Edit clicked for bill:", bill);
    setEditBill(bill);
    onOpen();
  };

  return { handleEditBill, editBill, isOpen, onOpen, onClose };
};
