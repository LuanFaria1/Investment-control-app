import React, { useContext, useState } from 'react';
import { InvestmentContext } from '../context/InvestmentContext';
import InvestmentForm from '../components/InvestmentForm';
import InvestmentChart from '../components/Charts/InvestmentChart';

function DashboardPage() {
  const { investments } = useContext(InvestmentContext);
  const [viewMode, setViewMode] = useState('monthly');

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-4">Controle de Investimentos</h1>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setViewMode('monthly')} className={`p-2 rounded ${viewMode === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
          Ver Rentabilidade Mensal
        </button>
        <button onClick={() => setViewMode('daily')} className={`p-2 rounded ${viewMode === 'daily' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}>
          Ver Rentabilidade Diária
        </button>
      </div>

      <InvestmentForm />

      <ul className="bg-white p-4 rounded shadow-md">
        {investments.map((inv) => (
          <li key={inv.id} className="flex justify-between p-2 border-b">
            {inv.name} - R$ {inv.amount} - {new Date(inv.date).toLocaleDateString()} - 
            {viewMode === 'monthly' ? ` Projeção: R$ ${(inv.amount * (inv.monthlyReturn / 100)).toFixed(2)}` :
              ` Projeção: R$ ${(inv.amount * (inv.dailyReturn / 100)).toFixed(2)} por dia`}
          </li>
        ))}
      </ul>

      <InvestmentChart investments={investments} />
    </div>
  );
}

export default DashboardPage;
