import React, { useContext } from "react";
import { CashFlowContext } from "../context/CashFlowContext";
import CashFlowForm from "../components/CashFlowForm";
import CashFlowChart from "../components/Charts/CashFlowChart";

function CashFlowPage() {
  const { records, balance } = useContext(CashFlowContext);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Controle de Gastos</h1>

      <CashFlowForm />

      <h2 className="text-xl font-semibold mt-8 mb-2">Resumo Financeiro</h2>
      <p className="mb-4 font-semibold">Saldo Atual: R$ {balance.toFixed(2)}</p>

      <h2 className="text-xl font-semibold mb-4">Distribuição de Gastos</h2>
      <CashFlowChart records={records} />
    </div>
  );
}

export default CashFlowPage;
