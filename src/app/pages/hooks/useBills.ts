import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Bill } from "../../../entities/model";

const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:3030/bills");
        setBills(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  const addBill = async (newBill: Bill) => {
    try {
      console.log("Adding bill:", newBill);
      const response = await axios.post("http://localhost:3030/bills", newBill);
      setBills((prevBills) => [...prevBills, response.data]);
      console.log("Added bill:", response.data);
    } catch (error) {
      console.error("Error adding bill:", error);
    }
  };

  const updateBill = async (updatedBill: Bill) => {
    console.log("Updating bill:", updatedBill);
    try {
      const response = await axios.put(
        `http://localhost:3030/bills/${updatedBill.id}`,
        updatedBill
      );
      console.log("Updated bill:", response.data);
      if (response.status === 200 || response.status === 204) {
        setBills((prevBills) =>
          prevBills.map((bill) =>
            bill.id === updatedBill.id ? response.data : bill
          )
        );
      }
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  const deleteBill = async (bill: Bill) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/bills/${bill.id}`
      );
      if (response.status === 200) {
        console.log("Deleted bill:", response.data);
        setBills((prevBills) => prevBills.filter((b) => b.id !== bill.id));
      }
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  return { bills, addBill, updateBill, deleteBill };
};

export default useBills;
