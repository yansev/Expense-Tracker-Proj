import React, { useState } from "react";
import axios from "axios";
import { SavingsGoal } from "../../features/types";

const SavingsPlanner: React.FC = () => {
  const [goal, setGoal] = useState("");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [savedAmount, setSavedAmount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal: SavingsGoal = {
      id: new Date().toISOString(),
      goal, // updated property
      targetAmount,
      savedAmount, // updated property
    };
    await axios.post("/api/savings-goals", newGoal);
    setGoal("");
    setTargetAmount(0);
    setSavedAmount(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(parseFloat(e.target.value))}
      />
      <input
        type="number"
        placeholder="Saved Amount"
        value={savedAmount}
        onChange={(e) => setSavedAmount(parseFloat(e.target.value))}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
};

export default SavingsPlanner;
