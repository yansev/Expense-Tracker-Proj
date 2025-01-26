import { useState, useEffect } from "react";
import axios from "axios";
import { Expense } from "../../components/expenses/types/ExpensesTypes";

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3030/expenses");
        console.log("Fetched Expenses:", response.data);
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const addExpense = async (expense: Expense) => {
    try {
      const timestamp = new Date().getTime();
      const newExpense = {
        ...expense,
        id: timestamp,
      };

      await axios.post("http://localhost:3030/expenses", newExpense);

      const updatedResponse = await axios.get("http://localhost:3030/expenses");
      setExpenses(updatedResponse.data);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const updateExpense = async (updatedExpense: Expense) => {
    try {
      await axios.put(
        `http://localhost:3030/expenses/${updatedExpense.id}`,
        updatedExpense
      );

      const updatedResponse = await axios.get("http://localhost:3030/expenses");
      setExpenses(updatedResponse.data);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deleteExpense = async (expense: Expense) => {
    try {
      await axios.delete(`http://localhost:3030/expenses/${expense.id}`);

      const updatedResponse = await axios.get("http://localhost:3030/expenses");
      setExpenses(updatedResponse.data);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return { expenses, addExpense, updateExpense, deleteExpense };
};

export default useExpenses;
