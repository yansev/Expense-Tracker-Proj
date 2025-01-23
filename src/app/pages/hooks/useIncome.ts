import { useState, useEffect } from "react";
import axios from "axios";
import { Income } from "../../components/income/types/IncomeTypes";
import { Expense } from "../../components/expenses/types/ExpensesTypes";
import { Bill } from "../../components/bills/types/BillTypes";
import { Savings } from "../../components/savings/types/SavingsTypes";

const useIncome = () => {
  const [income, setIncome] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [savings, setSavings] = useState<Savings[]>([]);

  const fetchIncome = async () => {
    try {
      const response = await axios.get("http://localhost:3030/income");
      setIncome(response.data);
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const addIncome = async (newIncome: Income) => {
    try {
      await axios.post("http://localhost:3030/income", newIncome);
      fetchIncome();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const updateIncome = async (updatedIncome: Income) => {
    try {
      const response = await axios.put(
        `http://localhost:3030/income/${updatedIncome.id}`,
        updatedIncome
      );
      if (response.status === 200 || response.status === 204) {
        setIncome((prevIncome) =>
          prevIncome.map((income) =>
            income.id === updatedIncome.id ? updatedIncome : income
          )
        );
      }
    } catch (error) {
      console.error("Error updating income:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3030/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get("http://localhost:3030/bills");
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchSavings = async () => {
    try {
      const response = await axios.get("http://localhost:3030/savings");
      setSavings(response.data);
    } catch (error) {
      console.error("Error fetching savings:", error);
    }
  };

  useEffect(() => {
    fetchSavings();
  }, []);

  const deleteIncome = async (incomeToDelete: Income) => {
    try {
      const response = await axios.delete(
        `http://localhost:3030/income/${incomeToDelete.id}`
      );
      if (response.status === 200) {
        setIncome((prevIncome) =>
          prevIncome.filter((income) => income.id !== incomeToDelete.id)
        );
      }
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  return {
    income,
    addIncome,
    updateIncome,
    deleteIncome,
    expenses,
    bills,
    savings,
  };
};

export default useIncome;
