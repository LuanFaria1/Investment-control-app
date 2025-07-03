import React, { createContext, useState } from 'react';

export const InvestmentContext = createContext();

export const InvestmentProvider = ({ children }) => {
  const [investments, setInvestments] = useState([]);

  const addInvestment = (investment) => {
    setInvestments((prev) => [...prev, { ...investment, id: Date.now() }]);
  };

  return (
    <InvestmentContext.Provider value={{ investments, addInvestment }}>
      {children}
    </InvestmentContext.Provider>
  );
};
