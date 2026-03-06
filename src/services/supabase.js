import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Accounts
export async function fetchAccounts(userId) {
  return supabase
    .from('accounts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
}

export async function addAccount({ user_id, name, type }) {
  return supabase.from('accounts').insert([{ user_id, name, type }]);
}

export async function deleteAccount(accountId, userId) {
  return supabase
    .from('accounts')
    .delete()
    .eq('id', accountId)
    .eq('user_id', userId);
}

// Atualiza o saldo da conta pelo id
export async function updateAccountBalance(accountId, newBalance) {
  return supabase
    .from('accounts')
    .update({ balance: Number(newBalance) })
    .eq('id', accountId);
}

// Transactions
export async function fetchTransactions(userId) {
  return supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
}

export async function addTransaction(tx) {
  return supabase.from('transactions').insert([tx]);
}

export async function deleteTransaction(id, userId) {
  return supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
}

// Auth
export async function signUp({ email, password }) {
  return supabase.auth.signUp({ email, password });
}

export async function signIn({ email, password }) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export function getSession() {
  return supabase.auth.getSession();
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}
