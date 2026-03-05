/**
 * Get month name from month number (1-12)
 */
export const getMonthName = (monthNumber) => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  return months[monthNumber - 1] || months[0];
};

/**
 * Get month number from month name
 */
export const getMonthNumber = (monthName) => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  return months.indexOf(monthName) + 1;
};

/**
 * Filter transactions by month and year
 */
export const filterTransactionsByMonth = (transactions, month, year) => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionMonth = transactionDate.getMonth() + 1;
    const transactionYear = transactionDate.getFullYear();
    return transactionMonth === month && transactionYear === year;
  });
};

/**
 * Calculate total income for given transactions
 */
export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

/**
 * Calculate total expenses for given transactions
 */
export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);
};

/**
 * Calculate balance (income - expenses)
 */
export const calculateBalance = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  return income - expenses;
};

/**
 * Group expenses by category
 */
export const groupExpensesByCategory = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const grouped = {};

  expenses.forEach((transaction) => {
    const category = transaction.category;
    if (!grouped[category]) {
      grouped[category] = 0;
    }
    grouped[category] += parseFloat(transaction.amount);
  });

  return grouped;
};

/**
 * Format currency
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

/**
 * Format date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get current month and year
 */
export const getCurrentMonthYear = () => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    monthName: getMonthName(now.getMonth() + 1),
  };
};

/**
 * Income categories
 */
export const INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Outras Receitas',
];

/**
 * Expense categories
 */
export const EXPENSE_CATEGORIES = [
  'Habitação',
  'Alimentação',
  'Transportes',
  'Compras',
  'Subscrições',
  'Saúde',
  'Entretenimento',
  'Outros',
];

/**
 * Get monthly summary for all transactions
 * Returns an array of objects with month, year, income, expenses, and balance
 */
export const getMonthlyOverview = (transactions) => {
  // Group transactions by month and year
  const grouped = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const key = `${year}-${month}`;

    if (!grouped[key]) {
      grouped[key] = {
        month: month,
        year: year,
        monthName: getMonthName(month),
        income: 0,
        expenses: 0,
      };
    }

    const amount = parseFloat(transaction.amount);
    if (transaction.type === 'income') {
      grouped[key].income += amount;
    } else if (transaction.type === 'expense') {
      grouped[key].expenses += amount;
    }
  });

  // Convert to array and calculate balance
  const overview = Object.values(grouped).map((item) => ({
    ...item,
    balance: item.income - item.expenses,
  }));

  // Sort by year and month (most recent first)
  overview.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return b.month - a.month;
  });

  return overview;
};
