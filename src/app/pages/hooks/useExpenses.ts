import { useState, useEffect } from "react";
import axios from "axios";
import { Expense } from "../../../entities/model";

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

  const addExpense = async (newExpense: Expense) => {
    try {
      console.log("Adding expense:", newExpense);
      const response = await axios.post(
        "http://localhost:3030/expenses",
        newExpense
      );
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
      console.log("Added expense:", response.data);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const updateExpense = async (updatedExpense: Expense) => {
    console.log("Updating expense:", updatedExpense);
    try {
      const response = await axios.put(
        `http://localhost:3030/expenses/${updatedExpense.id}`,
        updatedExpense
      );
      console.log("Updated expense:", response.data);
      if (response.status === 200 || response.status === 204) {
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === updatedExpense.id ? response.data : expense
          )
        );
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deleteExpense = async (expense: Expense) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/expenses/${expense.id}`
      );
      if (response.status === 200) {
        console.log("Deleted expense:", response.data);
        setExpenses((prevExpenses) =>
          prevExpenses.filter((e) => e.id !== expense.id)
        );
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return { expenses, addExpense, updateExpense, deleteExpense };
};

export default useExpenses;
