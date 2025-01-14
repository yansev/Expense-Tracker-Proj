import React, { useState } from "react";
import axios from "axios";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const Bills: React.FC = () => {
  const [bill, setBill] = useState<string>(""); // Title of the expense
  const [plannedAmount, setPlannedAmount] = useState<number>(); // Amount for the expense
  const [actualAmount, setActualAmount] = useState<number>(); // Amount for the expense
  const [dueDate, setDueDate] = useState<Date | null>(null); // Due date of the bill
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false); // Track from visibility

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the expense data
    const newBill = {
      bill,
      plannedAmount,
      actualAmount,
      dueDate,
    };

    try {
      // Send a POST request to the backend
      const response = await axios.post("/api/expenses", newBill);
      console.log("Bill added:", response.data);

      // Reset form fields after successful submission
      setBill("");
      setPlannedAmount(0);
      setActualAmount(0);
      setDueDate(null);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsFormVisible(!isFormVisible)}>Add Bill</Button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl>
              <FormLabel>Bill Title</FormLabel>
              <Input
                type="text"
                id="bill"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="Enter bill title"
                required
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input
                type="date"
                id="dueDate"
                value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
                onChange={(e) =>
                  setDueDate(e.target.value ? new Date(e.target.value) : null)
                }
                placeholder="Due Date"
                required
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel>Planned Amount</FormLabel>
              <Input
                type="number"
                id="plannedAmount"
                value={plannedAmount}
                onChange={(e) => setPlannedAmount(parseFloat(e.target.value))}
                placeholder="Enter planned amount"
                required
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel>Actual Amount</FormLabel>
              <Input
                type="number"
                id="actualAmount"
                value={actualAmount}
                onChange={(e) => setActualAmount(parseFloat(e.target.value))}
                placeholder="Enter actual amount"
              />
            </FormControl>
          </div>

          <button type="submit">Add Expense</button>
        </form>
      )}
    </div>
  );
};

export default Bills;
