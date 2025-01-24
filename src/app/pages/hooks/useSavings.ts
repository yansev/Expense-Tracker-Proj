import { useState, useEffect } from "react";
import axios from "axios";
import { Bill } from "../../components/bills/types/BillTypes";
import { Expense } from "../../components/expenses/types/ExpensesTypes";
import { Income } from "../../components/income/types/IncomeTypes";
import { Savings } from "../../components/savings/types/SavingsTypes";

const useSavings = () => {
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expensesData, setExpensesData] = useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [billsData, setBillsData] = useState<Bill[]>([]);
  const [totalBills, setTotalBills] = useState(0);
  const [savingsData, setSavingsData] = useState<Savings[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axios.get("http://localhost:3030/income");
        const total = response.data.reduce(
          (sum: number, inc: Income) => sum + inc.amount,
          0
        );
        setTotalIncome(total);
        setIncomeData(response.data);
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
    fetchIncome();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3030/expenses");
        const total = response.data.reduce(
          (sum: number, exp: Expense) => sum + exp.actualAmount,
          0
        );
        setTotalExpenses(total);
        setExpensesData(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:3030/bills");
        const total = response.data.reduce(
          (sum: number, bill: Bill) => sum + bill.actualAmount,
          0
        );
        setTotalBills(total);
        setBillsData(response.data);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };
    fetchBills();
  }, []);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const response = await axios.get("http://localhost:3030/savings");
        const total = response.data.reduce(
          (sum: number, sav: Savings) => sum + sav.amount,
          0
        );
        setTotalSavings(total);
        setSavingsData(response.data);
      } catch (error) {
        console.error("Error fetching savings:", error);
      }
    };
    fetchSavings();
  }, []);

  return {
    incomeData,
    totalIncome,
    expensesData,
    totalExpenses,
    billsData,
    totalBills,
    savingsData,
    totalSavings,
    setTotalSavings,
  };
};

export default useSavings;
