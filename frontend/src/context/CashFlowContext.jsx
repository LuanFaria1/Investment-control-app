import React, { createContext, useState } from 'react';

export const CashFlowContext = createContext();

export const CashFlowProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const addRecord = (record) => {
    setRecords((prev) => [...prev, { 
      ...record, 
      id: Date.now(),
      amount: Number(record.amount) // Garante que amount é número
    }]);
  };

  return (
    <CashFlowContext.Provider value={{ 
      records,
      addRecord,
      // Adicione estas funções úteis abaixo
      expenses: records.filter(r => r.type === 'DESPESA'),
      incomes: records.filter(r => r.type === 'RECEITA'),
      balance: records.reduce((acc, r) => r.type === 'RECEITA' ? acc + r.amount : acc - r.amount, 0)
    }}>
      {children}
    </CashFlowContext.Provider>
  );
};
