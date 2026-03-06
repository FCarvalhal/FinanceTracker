import React, { useState, useEffect } from 'react';
import { fetchAccounts, addAccount, deleteAccount } from '../services/supabase';

function AccountForm({ userId, onAccountAdded }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('bank');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addAccount({ user_id: userId, name, type });
    setName('');
    setType('bank');
    setLoading(false);
    onAccountAdded();
  };

  return (
    <form onSubmit={handleSubmit} className='mb-3'>
      <div className='row g-2 align-items-end'>
        <div className='col-md-5'>
          <input
            type='text'
            className='form-control'
            placeholder='Nome da Conta'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='col-md-4'>
          <select
            className='form-select'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value='bank'>Conta Corrente</option>
            <option value='credit_card'>Cartão de Crédito</option>
            <option value='cash'>Dinheiro</option>
            <option value='digital_wallet'>Revolut/Wallet</option>
          </select>
        </div>
        <div className='col-md-3'>
          <button
            className='btn btn-primary w-100'
            type='submit'
            disabled={loading}
          >
            {loading ? 'A adicionar...' : 'Adicionar Conta'}
          </button>
        </div>
      </div>
    </form>
  );
}

function AccountTable({ userId, accounts, onDelete }) {
  return (
    <div className='table-responsive mb-3'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Saldo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.id}>
              <td>{acc.name}</td>
              <td>{acc.type}</td>
              <td>{acc.balance}</td>
              <td>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => onDelete(acc.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { AccountForm, AccountTable };
