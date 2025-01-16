import React, { createContext, useContext, useState } from "react";
import {
  MonthContextProps,
  MonthProviderProps,
} from "../../../entities/expense/model";

const MonthContext = createContext<MonthContextProps | undefined>(undefined);

export const MonthProvider: React.FC<MonthProviderProps> = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </MonthContext.Provider>
  );
};

export const useMonth = () => {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error("useMonth must be used within a MonthProvider");
  }
  return context;
};
