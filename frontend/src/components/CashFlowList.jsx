import React, { useContext } from 'react';
import { CashFlowContext } from '../context/CashFlowContext';

function CashFlowList() {
  const { records, balance } = useContext(CashFlowContext);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Saldo Atual: R$ {balance.toFixed(2)}
        <span className={`ml-2 text-sm ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          ({balance >= 0 ? 'Positivo' : 'Negativo'})
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Histórico</h3>
          <ul className="space-y-2">
            {records.map((item) => (
              <li key={item.id} className={`p-2 rounded ${item.type === 'RECEITA' ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="flex justify-between">
                  <span className="font-medium">{item.description}</span>
                  <span className={`font-bold ${item.type === 'RECEITA' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.type === 'RECEITA' ? '+' : '-'}R$ {item.amount.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString('pt-BR')} • {item.type}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CashFlowList;
