import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TransactionForm from './components/TransactionForm';
import TransactionTable from './components/TransactionTable';
import Charts from './components/Charts';
import MonthlyOverview from './components/MonthlyOverview';
import SummaryCards from './components/SummaryCards';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import { AccountForm, AccountTable } from './components/AccountForm';
import AccountSelector from './components/AccountSelector';
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  fetchAccounts,
  addAccount,
  deleteAccount,
  getSession,
  onAuthStateChange,
} from './services/supabase';
import {
  filterTransactionsByMonth,
  getCurrentMonthYear,
  getMonthNumber,
  getMonthlyOverview,
} from './utils/financeUtils';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login');
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const currentMonthYear = getCurrentMonthYear();
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonthYear.monthName,
  );
  const [selectedYear, setSelectedYear] = useState(currentMonthYear.year);
  const [activeTab, setActiveTab] = useState('monthly');

  // Auth state
  useEffect(() => {
    getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });
    const { data: listener } = onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch accounts
  useEffect(() => {
    if (!user) return;
    setAccountsLoading(true);
    fetchAccounts(user.id).then(({ data }) => {
      setAccounts(data || []);
      setAccountsLoading(false);
    });
  }, [user]);

  // Fetch transactions
  useEffect(() => {
    if (!user) return;
    setTransactionsLoading(true);
    fetchTransactions(user.id).then(({ data }) => {
      setAllTransactions(data || []);
      setTransactionsLoading(false);
    });
  }, [user]);

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

  // Add transaction
  const handleAddTransaction = async (transactionData) => {
    if (!user) return;
    const tx = {
      ...transactionData,
      user_id: user.id,
      account_id: transactionData.account_id || selectedAccountId,
    };
    const { data, error } = await addTransaction(tx);
    if (!error) {
      fetchTransactions(user.id).then(({ data }) =>
        setAllTransactions(data || []),
      );
      // Refetch accounts to reflect updated balance
      fetchAccounts(user.id).then(({ data }) => setAccounts(data || []));
    }
  };

  // Delete transaction
  const handleDeleteTransaction = async (id) => {
    if (!user) return;
    if (window.confirm('Tem a certeza que deseja eliminar esta transação?')) {
      await deleteTransaction(id, user.id);
      fetchTransactions(user.id).then(({ data }) =>
        setAllTransactions(data || []),
      );
    }
  };

  // Add account
  const handleAddAccount = async (account) => {
    if (!user) return;
    await addAccount({ ...account, user_id: user.id });
    fetchAccounts(user.id).then(({ data }) => setAccounts(data || []));
  };

  // Delete account
  const handleDeleteAccount = async (accountId) => {
    if (!user) return;
    await deleteAccount(accountId, user.id);
    fetchAccounts(user.id).then(({ data }) => setAccounts(data || []));
  };

  // Auth handlers
  const handleLogout = () => {
    setUser(null);
    setAllTransactions([]);
    setAccounts([]);
  };

  if (!user) {
    return authView === 'login' ? (
      <Login
        onLogin={() => setAuthView('login')}
        switchToSignup={() => setAuthView('signup')}
      />
    ) : (
      <Signup
        onSignup={() => setAuthView('login')}
        switchToLogin={() => setAuthView('login')}
      />
    );
  }

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className='App bg-light min-vh-100 d-flex flex-column'>
      {/* Navbar with Logout and user email */}
      <Navbar
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        rightContent={
          <div className='d-flex align-items-center gap-2'>
            <span className='me-2 text-secondary small'>{user.email}</span>
            <Logout onLogout={handleLogout} />
          </div>
        }
      />

      <div className='container flex-grow-1'>
        {/* Accounts management */}
        <div className='mb-4'>
          <h5 className='mb-2'>Contas</h5>
          <AccountForm
            userId={user.id}
            onAccountAdded={() =>
              fetchAccounts(user.id).then(({ data }) => setAccounts(data || []))
            }
          />
          <AccountTable
            userId={user.id}
            accounts={accounts}
            onDelete={handleDeleteAccount}
            onAccountUpdated={() =>
              fetchAccounts(user.id).then(({ data }) => setAccounts(data || []))
            }
          />
        </div>

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
              <SummaryCards transactions={filteredTransactions} />
              <Charts transactions={filteredTransactions} />
              <div className='row g-4'>
                <div className='col-lg-5'>
                  <TransactionForm
                    onAddTransaction={handleAddTransaction}
                    accounts={accounts}
                    userId={user.id}
                  />
                </div>
                <div className='col-lg-7'>
                  <TransactionTable
                    transactions={filteredTransactions}
                    onDelete={handleDeleteTransaction}
                    accounts={accounts}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Global Overview Tab */}
          {activeTab === 'global' && (
            <div className='tab-pane fade show active'>
              <MonthlyOverview
                monthlyData={getMonthlyOverview(allTransactions)}
              />
              <div className='card mb-4'>
                <div className='card-body'>
                  <h5 className='card-title'>
                    <i className='bi bi-list-ul me-2'></i>Todas as Transações
                  </h5>
                  <TransactionTable
                    transactions={allTransactions}
                    onDelete={handleDeleteTransaction}
                    accounts={accounts}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className='bg-white text-center text-muted py-3 mt-5 shadow-sm'>
        <div className='container'>
          <p className='mb-0'>Gestor de Finanças Pessoais © 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
