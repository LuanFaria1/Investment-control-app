import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx'; 
import CashFlowPage from './pages/CashFlowPage.jsx'; 
import { InvestmentProvider } from './context/InvestmentContext';
import { CashFlowProvider } from './context/CashFlowContext';

function App() {
  return (
    <InvestmentProvider>
      <CashFlowProvider>
        <Router>
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
              <h2 className="text-2xl font-bold mb-6">Invest Control</h2>
              <nav className="flex flex-col gap-4">
                <Link to="/" className="hover:text-yellow-400">Dashboard</Link>
                <Link to="/cashflow" className="hover:text-yellow-400">Controle de Gastos</Link>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/cashflow" element={<CashFlowPage />} />
              </Routes>
            </div>
          </div>
        </Router>
      </CashFlowProvider>
    </InvestmentProvider>
  );
}

export default App;
