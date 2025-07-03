import React, { useState, useContext } from "react";
import { CashFlowContext } from "../context/CashFlowContext";
import CashFlowChart from "./Charts/CashFlowChart";

function CashFlowForm() {
  const { addRecord, records } = useContext(CashFlowContext);

  const [type, setType] = useState("DESPESA");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Categorias padrão
  const categories = ["Alimentação", "Transporte", "Lazer", "Investimento", "Educação", "Saúde", "Outros"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !date || (type === "DESPESA" && !category)) {
      alert("Preencha todos os campos!");
      return;
    }

    addRecord({ type, category: type === "DESPESA" ? category : "Receita", description, amount: parseFloat(amount), date });

    // Reset
    setCategory("");
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Adicionar Registro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="DESPESA">Despesa</option>
          <option value="RECEITA">Receita</option>
        </select>

        {/* Exibir categorias apenas se for despesa */}
        {type === "DESPESA" && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Selecione a Categoria</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Adicionar
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Resumo Gráfico</h3>
        <CashFlowChart records={records} />
      </div>
    </div>
  );
}

export default CashFlowForm;
