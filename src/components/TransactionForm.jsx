import { useState } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/financeUtils';
import AccountSelector from './AccountSelector';

const TransactionForm = ({ onAddTransaction, accounts = [], userId }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Alimentação',
    date: new Date().toISOString().split('T')[0],
    account_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'type') {
        updated.category =
          value === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0];
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.description ||
      !formData.amount ||
      parseFloat(formData.amount) <= 0 ||
      !formData.account_id
    ) {
      alert(
        'Por favor, preencha todos os campos com valores válidos e selecione uma conta',
      );
      return;
    }
    onAddTransaction(formData);
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: 'Alimentação',
      date: new Date().toISOString().split('T')[0],
      account_id: '',
    });
  };

  const categories =
    formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className='transaction-card'>
      <div className='card-body'>
        <h5 className='card-title'>➕ Adicionar Nova Transação</h5>
        <form onSubmit={handleSubmit}>
          <div className='row g-3'>
            <div className='col-md-6'>
              <label htmlFor='description' className='form-label'>
                📝 Descrição
              </label>
              <input
                type='text'
                className='form-control transaction-input'
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Ex: Salário, Supermercado...'
                required
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='amount' className='form-label'>
                💰 Valor (€)
              </label>
              <input
                type='number'
                className='form-control transaction-input'
                id='amount'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
                placeholder='0.00'
                step='0.01'
                min='0'
                required
              />
            </div>
          </div>
          <div className='row g-3 mt-2'>
            <div className='col-md-3'>
              <label htmlFor='type' className='form-label'>
                🏷️ Tipo
              </label>
              <select
                className='form-select transaction-select'
                id='type'
                name='type'
                value={formData.type}
                onChange={handleChange}
              >
                <option value='income'>💵 Receita</option>
                <option value='expense'>💸 Despesa</option>
              </select>
            </div>
            <div className='col-md-3'>
              <label htmlFor='category' className='form-label'>
                📂 Categoria
              </label>
              <select
                className='form-select transaction-select'
                id='category'
                name='category'
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-md-3'>
              <label htmlFor='date' className='form-label'>
                📅 Data
              </label>
              <input
                type='date'
                className='form-control transaction-input'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-md-3'>
              <label htmlFor='account_id' className='form-label'>
                🏦 Conta
              </label>
              <AccountSelector
                userId={userId}
                accountId={formData.account_id}
                setAccountId={(id) =>
                  setFormData((prev) => ({ ...prev, account_id: id }))
                }
              />
            </div>
          </div>
          <div className='mt-4'>
            <button type='submit' className='btn btn-gradient w-100'>
              ✅ Adicionar Transação
            </button>
          </div>
        </form>
      </div>

      {/* ===== INLINE PROFESSIONAL STYLES ===== */}
      <style jsx='true'>{`
        .transaction-card {
          border-radius: 16px !important;
          padding: 1.5rem !important;
          margin-bottom: 2rem !important;
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 100%
          ) !important;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18) !important;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease !important;
        }
        .transaction-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.24) !important;
        }
        .transaction-card .card-title {
          color: #fff !important;
          font-weight: 700 !important;
          font-size: 1.5rem !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25) !important;
        }
        .transaction-input,
        .transaction-select {
          border-radius: 12px !important;
          border: 2px solid rgba(255, 255, 255, 0.35) !important;
          padding: 0.75rem !important;
          font-weight: 600 !important;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease !important;
        }
        .transaction-input:focus,
        .transaction-select:focus {
          border-color: #16a085 !important;
          box-shadow: 0 0 0 3px rgba(22, 160, 133, 0.15) !important;
          transform: translateY(-1px) !important;
        }
        .btn-gradient {
          background: linear-gradient(
            135deg,
            #27ae60 0%,
            #2ecc71 100%
          ) !important;
          color: #fff !important;
          font-weight: 700 !important;
          border-radius: 12px !important;
          font-size: 1.1rem !important;
          padding: 0.85rem !important;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease !important;
        }
        .btn-gradient:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22) !important;
        }
        @media (max-width: 768px) {
          .transaction-card {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionForm;
