const STORAGE_KEY = 'financeTracker_transactions';

/**
 * Load all transactions from localStorage
 */
export const loadTransactions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};

/**
 * Save transactions to localStorage
 */
export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return true;
  } catch (error) {
    console.error('Error saving transactions:', error);
    return false;
  }
};

/**
 * Add a new transaction
 */
export const addTransaction = (transaction) => {
  const transactions = loadTransactions();
  const newTransaction = {
    ...transaction,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  transactions.push(newTransaction);
  saveTransactions(transactions);
  return newTransaction;
};

/**
 * Delete a transaction by ID
 */
export const deleteTransaction = (id) => {
  const transactions = loadTransactions();
  const filtered = transactions.filter((t) => t.id !== id);
  saveTransactions(filtered);
  return filtered;
};

/**
 * Update a transaction
 */
export const updateTransaction = (id, updatedData) => {
  const transactions = loadTransactions();
  const index = transactions.findIndex((t) => t.id === id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...updatedData };
    saveTransactions(transactions);
    return transactions[index];
  }
  return null;
};
