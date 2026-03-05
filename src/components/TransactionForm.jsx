import React, { useState } from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/financeUtils';

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Alimentação',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Update category when type changes
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
      parseFloat(formData.amount) <= 0
    ) {
      alert('Por favor, preencha todos os campos com valores válidos');
      return;
    }

    onAddTransaction(formData);

    // Reset form
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: 'Alimentação',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const categories =
    formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className='card mb-4' style={{ border: '2px solid #e9ecef' }}>
      <div className='card-body'>
        <h5
          className='card-title'
          style={{
            color: '#2c3e50',
            fontSize: '1.4rem',
            marginBottom: '1.5rem',
          }}
        >
          ➕ Adicionar Nova Transação
        </h5>
        <form onSubmit={handleSubmit}>
          <div className='row g-3'>
            <div className='col-md-6'>
              <label htmlFor='description' className='form-label'>
                📝 Descrição
              </label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                placeholder='Ex: Salário, Supermercado...'
                required
                style={{
                  borderRadius: '8px',
                  padding: '0.75rem',
                }}
              />
            </div>

            <div className='col-md-6'>
              <label htmlFor='amount' className='form-label'>
                💰 Valor (€)
              </label>
              <input
                type='number'
                className='form-control'
                id='amount'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
                placeholder='0.00'
                step='0.01'
                min='0'
                required
                style={{
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                }}
              />
            </div>
          </div>

          <div className='row g-3 mt-2'>
            <div className='col-md-4'>
              <label htmlFor='type' className='form-label'>
                🏷️ Tipo
              </label>
              <select
                className='form-select'
                id='type'
                name='type'
                value={formData.type}
                onChange={handleChange}
                style={{
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontWeight: '600',
                }}
              >
                <option value='income'>💵 Receita</option>
                <option value='expense'>💸 Despesa</option>
              </select>
            </div>

            <div className='col-md-4'>
              <label htmlFor='category' className='form-label'>
                📂 Categoria
              </label>
              <select
                className='form-select'
                id='category'
                name='category'
                value={formData.category}
                onChange={handleChange}
                style={{
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontWeight: '600',
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className='col-md-4'>
              <label htmlFor='date' className='form-label'>
                📅 Data
              </label>
              <input
                type='date'
                className='form-control'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  borderRadius: '8px',
                  padding: '0.75rem',
                }}
              />
            </div>
          </div>

          <div className='mt-4'>
            <button
              type='submit'
              className='btn btn-success btn-lg w-100'
              style={{
                borderRadius: '10px',
                padding: '0.875rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              ✅ Adicionar Transação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
