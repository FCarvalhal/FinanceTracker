import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@finance_tracker_transactions';
const PEOPLE_KEY = '@finance_tracker_people';

/**
 * Salva uma transação no AsyncStorage
 * @param {Object} transaction - Objeto da transação
 */
export const saveTransaction = async (transaction) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    const transactions = existingData ? JSON.parse(existingData) : [];
    
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    transactions.push(newTransaction);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    
    return newTransaction;
  } catch (error) {
    console.error('Erro ao salvar transação:', error);
    throw error;
  }
};

/**
 * Obtém todas as transações salvas
 * @returns {Promise<Array>} - Array de transações
 */
export const getTransactions = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao obter transações:', error);
    return [];
  }
};

/**
 * Deleta uma transação
 * @param {string} id - ID da transação
 */
export const deleteTransaction = async (id) => {
  try {
    const transactions = await getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    throw error;
  }
};

/**
 * Salva lista de pessoas
 * @param {Array<string>} people - Array com nomes das pessoas
 */
export const savePeople = async (people) => {
  try {
    await AsyncStorage.setItem(PEOPLE_KEY, JSON.stringify(people));
  } catch (error) {
    console.error('Erro ao salvar pessoas:', error);
    throw error;
  }
};

/**
 * Obtém lista de pessoas
 * @returns {Promise<Array<string>>} - Array de nomes
 */
export const getPeople = async () => {
  try {
    const data = await AsyncStorage.getItem(PEOPLE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao obter pessoas:', error);
    return [];
  }
};

/**
 * Calcula o saldo de cada pessoa
 * @param {Array} transactions - Array de transações
 * @returns {Object} - Objeto com saldo de cada pessoa
 */
export const calculateBalances = (transactions) => {
  const balances = {};
  
  transactions.forEach(transaction => {
    const { paidBy, splitBetween, amount } = transaction;
    const amountPerPerson = amount / splitBetween.length;
    
    // Quem pagou recebe de volta
    if (!balances[paidBy]) balances[paidBy] = 0;
    balances[paidBy] += amount;
    
    // Cada pessoa envolvida deve sua parte
    splitBetween.forEach(person => {
      if (!balances[person]) balances[person] = 0;
      balances[person] -= amountPerPerson;
    });
  });
  
  return balances;
};
