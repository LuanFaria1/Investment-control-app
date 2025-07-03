import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1", "#FF6F61"];

function CashFlowChart({ records = [] }) { 
  if (!Array.isArray(records)) return <p className="mt-4">Dados inválidos.</p>;

  const expenses = records.filter((r) => r.type === "DESPESA");

  const categoryData = expenses.reduce((acc, curr) => {
    const existingCategory = acc.find((item) => item.name === curr.category);
    if (existingCategory) {
      existingCategory.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  if (categoryData.length === 0) {
    return <p className="mt-4">Nenhuma despesa registrada para exibir o gráfico.</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4">Distribuição de Gastos por Categoria</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </div>
  );
}

export default CashFlowChart;
