import React, { useState, useContext } from 'react';
import { InvestmentContext } from '../context/InvestmentContext';

function InvestmentForm() {
  const { addInvestment } = useContext(InvestmentContext);

  const [investment, setInvestment] = useState({
    name: '',
    type: 'Ação',
    amount: '',
    date: '',
    monthlyReturn: '',
    dailyReturn: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestment({ ...investment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInvestment(investment);
    setInvestment({
      name: '',
      type: 'Ação',
      amount: '',
      date: '',
      monthlyReturn: '',
      dailyReturn: '',
    });
  };

  const investmentOptions = {
    'Ação': ['BBAS3', 'ITSA4', 'KLBN11', 'SANB11', 'PETR4', 'VALE3'],
    'Renda Fixa': ['CDB Inter Liquidez Diária', 'Tesouro Selic', 'LCI', 'LCA'],
    'FII': ['HGLG11', 'MXRF11', 'KNRI11'],
    'Cripto': ['Bitcoin', 'Ethereum'],
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
      <select name="type" value={investment.type} onChange={handleChange} className="p-2 border rounded">
        {Object.keys(investmentOptions).map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select name="name" value={investment.name} onChange={handleChange} className="p-2 border rounded">
        <option value="">Selecione o Ativo</option>
        {investmentOptions[investment.type].map((inv) => (
          <option key={inv} value={inv}>{inv}</option>
        ))}
      </select>

      <input type="number" name="amount" placeholder="Valor Investido" value={investment.amount} onChange={handleChange} className="p-2 border rounded" />
      <input type="date" name="date" value={investment.date} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="monthlyReturn" placeholder="Rentabilidade Mensal (%)" value={investment.monthlyReturn} onChange={handleChange} className="p-2 border rounded" />
      {investment.type === 'Renda Fixa' && (
        <input type="number" name="dailyReturn" placeholder="Rentabilidade Diária (%)" value={investment.dailyReturn} onChange={handleChange} className="p-2 border rounded" />
      )}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Adicionar Investimento</button>
    </form>
  );
}

export default InvestmentForm;
