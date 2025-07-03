import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
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

  const [isFetching, setIsFetching] = useState(false);

  const investmentOptions = {
    'Ação': ['BBAS3', 'ITSA4', 'KLBN11', 'SANB11', 'PETR4', 'VALE3'],
    'Renda Fixa': ['CDB Inter Liquidez Diária', 'Tesouro Selic', 'LCI', 'LCA'],
    'FII': ['HGLG11', 'MXRF11', 'KNRI11'],
    'Cripto': ['Bitcoin', 'Ethereum'],
  };

  // Buscando rentabilidade automática quando mudar o ativo
  useEffect(() => {
    const fetchMonthlyReturn = async () => {
      if (investment.type === 'Ação' && investment.name) {
        try {
          setIsFetching(true);
          const response = await axios.get(`http://localhost:3001/api/investments/quote/${investment.name}`);
          const rentabilidade = response.data.monthlyChange || 0;
          setInvestment((prev) => ({ ...prev, monthlyReturn: rentabilidade }));
        } catch (error) {
          console.error('Erro ao buscar rentabilidade:', error);
          setInvestment((prev) => ({ ...prev, monthlyReturn: '' }));
        } finally {
          setIsFetching(false);
        }
      } else if (investment.type !== 'Ação') {
        // Para renda fixa e outros, o campo pode ser preenchido manualmente
        setInvestment((prev) => ({ ...prev, monthlyReturn: '' }));
      }
    };

    fetchMonthlyReturn();
  }, [investment.name, investment.type]);

  // Validação de formulário
  const isFormValid = () => {
    if (!investment.name || !investment.amount || !investment.date) return false;
    if (investment.type === 'Renda Fixa' && !investment.dailyReturn) return false;
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestment({ ...investment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

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

      <input
        type="number"
        name="monthlyReturn"
        placeholder="Rentabilidade Mensal (%)"
        value={investment.monthlyReturn}
        onChange={handleChange}
        className="p-2 border rounded"
        readOnly={investment.type === 'Ação'}
      />

      {investment.type === 'Renda Fixa' && (
        <input type="number" name="dailyReturn" placeholder="Rentabilidade Diária (%)" value={investment.dailyReturn} onChange={handleChange} className="p-2 border rounded" />
      )}

    <button
      type="submit"
      disabled={!isFormValid}
      className={`p-2 rounded text-white ${isFormValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {isFetching ? 'Carregando...' : 'Adicionar Investimento'}
      </button>
    </form>
  );
}

export default InvestmentForm;
