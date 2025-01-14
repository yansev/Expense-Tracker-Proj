import { Button, FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import React, { useState } from "react";

const Income: React.FC = () => {
  const [source, setSource] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [plannedAmount, setPlannedAmount] = useState<number>();
  const [actualAmount, setActualAmount] = useState<number>();
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Income added:", {
      source,
      month,
      plannedAmount,
      actualAmount,
    });
  };

  return (
    <div>
      <Button onClick={() => setIsFormVisible(!isFormVisible)}>
        Add Income
      </Button>
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <FormControl>
              <FormLabel>Source</FormLabel>
              <Input
                type="text"
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Enter source"
                required
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel>Month</FormLabel>
              <Input
                type="month"
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="Month"
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

          <button type="submit">Add Income</button>
        </form>
      )}
    </div>
  );
};

export default Income;
