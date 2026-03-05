import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import Charts from './components/Charts';
import MonthlyOverview from './components/MonthlyOverview';
import SummaryCards from './components/SummaryCards';
import {
  loadTransactions,
  addTransaction,
  deleteTransaction,
} from './utils/storage';
import {
  filterTransactionsByMonth,
  getCurrentMonthYear,
  getMonthNumber,
  getMonthlyOverview,
} from './utils/financeUtils';
import './App.css';

function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const currentMonthYear = getCurrentMonthYear();
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonthYear.monthName,
  );
  const [selectedYear, setSelectedYear] = useState(currentMonthYear.year);
  const [activeTab, setActiveTab] = useState('monthly');

  // Load transactions from localStorage on mount
  useEffect(() => {
    const transactions = loadTransactions();
    setAllTransactions(transactions);
  }, []);

  // Filter transactions when month/year or allTransactions changes
  useEffect(() => {
    const monthNumber = getMonthNumber(selectedMonth);
    const filtered = filterTransactionsByMonth(
      allTransactions,
      monthNumber,
      selectedYear,
    );
    setFilteredTransactions(filtered);
  }, [allTransactions, selectedMonth, selectedYear]);

  const handleAddTransaction = (transactionData) => {
    const newTransaction = addTransaction(transactionData);
    setAllTransactions((prev) => [...prev, newTransaction]);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Tem a certeza que deseja eliminar esta transação?')) {
      deleteTransaction(id);
      setAllTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className='App bg-light min-vh-100 d-flex flex-column'>
      {/* Modern Navbar with MonthSelector */}
      <Navbar
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
      />

      {/* Main Content */}
      <div className='container flex-grow-1'>
        {/* Tab Navigation */}
        <ul className='nav nav-tabs mb-4' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className={`nav-link ${activeTab === 'monthly' ? 'active' : ''}`}
              onClick={() => setActiveTab('monthly')}
              type='button'
              role='tab'
            >
              <i className='bi bi-calendar2-week me-2'></i>Dashboard Mensal
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className={`nav-link ${activeTab === 'global' ? 'active' : ''}`}
              onClick={() => setActiveTab('global')}
              type='button'
              role='tab'
            >
              <i className='bi bi-globe2 me-2'></i>Resumo Global
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className='tab-content'>
          {/* Monthly Dashboard Tab */}
          {activeTab === 'monthly' && (
            <div className='tab-pane fade show active'>
              {/* Summary Cards */}
              <SummaryCards transactions={filteredTransactions} />

              {/* Charts */}
              <Charts transactions={filteredTransactions} />

              <div className='row g-4'>
                <div className='col-lg-5'>
                  {/* Transaction Form */}
                  <TransactionForm onAddTransaction={handleAddTransaction} />
                </div>
                <div className='col-lg-7'>
                  {/* Transaction Table */}
                  <TransactionTable
                    transactions={filteredTransactions}
                    onDelete={handleDeleteTransaction}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Global Overview Tab */}
          {activeTab === 'global' && (
            <div className='tab-pane fade show active'>
              {/* Monthly Overview - Global Summary */}
              <MonthlyOverview
                monthlyData={getMonthlyOverview(allTransactions)}
              />

              {/* All Transactions Table */}
              <div className='card mb-4'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    <i className='bi bi-list-ul me-2'></i>Todas as Transações
                  </h5>
                  <TransactionTable
                    transactions={allTransactions}
                    onDelete={handleDeleteTransaction}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className='bg-white text-center text-muted py-3 mt-5 shadow-sm'>
        <div className='container'>
          <p className='mb-0'>Gestor de Finanças Pessoais © 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
