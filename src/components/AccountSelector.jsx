import { useState, useEffect } from 'react';
import { fetchAccounts } from '../services/supabase';

function AccountSelector({ userId, accountId, setAccountId }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchAccounts(userId).then(({ data }) => setAccounts(data || []));
    }
  }, [userId]);

  return (
    <select
      className='form-select'
      value={accountId}
      onChange={(e) => setAccountId(e.target.value)}
      required
    >
      <option value=''>Selecione a conta</option>
      {accounts.map((acc) => (
        <option key={acc.id} value={acc.id}>
          {acc.name}
        </option>
      ))}
    </select>
  );
}

export default AccountSelector;
