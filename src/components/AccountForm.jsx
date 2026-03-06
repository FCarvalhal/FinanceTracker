import { useState } from 'react';
import { addAccount, updateAccountBalance } from '../services/supabase';

function AccountForm({ userId, onAccountAdded }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('banco');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addAccount({ user_id: userId, name, type });
    setName('');
    setType('banco');
    setLoading(false);
    onAccountAdded();
  };

  return (
    <form onSubmit={handleSubmit} className='account-form'>
      <div className='row g-2 align-items-end'>
        <div className='col-md-5'>
          <input
            type='text'
            className='form-control account-input'
            placeholder='Nome da Conta'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='col-md-4'>
          <select
            className='form-select account-select'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value='banco'>Conta Corrente</option>
            <option value='cartao_credito'>Cart�o de Cr�dito</option>
            <option value='dinheiro'>Dinheiro</option>
            <option value='carteira_digital'>Revolut/Wallet</option>
          </select>
        </div>
        <div className='col-md-3'>
          <button
            className='btn btn-gradient w-100'
            type='submit'
            disabled={loading}
          >
            {loading ? 'A adicionar...' : 'Adicionar Conta'}
          </button>
        </div>
      </div>

      <style jsx='true'>{`
        .account-form {
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 100%
          ) !important;
          padding: 1.5rem !important;
          border-radius: 18px !important;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18) !important;
          margin-bottom: 1.5rem !important;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease !important;
        }
        .account-form:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.24) !important;
        }
        .account-input,
        .account-select {
          border-radius: 12px !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
          background: rgba(255, 255, 255, 0.95) !important;
          font-weight: 600 !important;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease !important;
        }
        .account-input:focus,
        .account-select:focus {
          border-color: #16a085 !important;
          box-shadow: 0 0 0 3px rgba(22, 160, 133, 0.15) !important;
          transform: translateY(-1px) !important;
        }
        .btn-gradient {
          background: linear-gradient(
            135deg,
            #3498db 0%,
            #16a085 100%
          ) !important;
          color: white !important;
          font-weight: 600 !important;
          border-radius: 12px !important;
          border: none !important;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease !important;
        }
        .btn-gradient:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18) !important;
        }
        @media (max-width: 768px) {
          .account-form {
            padding: 1rem !important;
          }
        }
      `}</style>
    </form>
  );
}

function AccountTable({ userId, accounts, onDelete, onAccountUpdated }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleEdit = (acc) => {
    setEditingId(acc.id);
    setEditValue(acc.balance);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue(0);
  };

  const handleSave = async (acc) => {
    setSaving(true);
    await updateAccountBalance(acc.id, Number(editValue));
    setSaving(false);
    setEditingId(null);
    setEditValue(0);
    if (typeof onAccountUpdated === 'function') onAccountUpdated();
  };

  return (
    <div className='table-responsive account-table'>
      <table className='table table-borderless modern-account-table'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Saldo</th>
            <th>A��es</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc, idx) => (
            <tr
              key={acc.id}
              className={`account-row${idx % 2 === 0 ? ' even' : ' odd'}`}
            >
              <td>{acc.name}</td>
              <td>{acc.type}</td>
              <td>
                {editingId === acc.id ? (
                  <input
                    type='number'
                    className='form-control form-control-sm account-balance-input'
                    value={editValue}
                    min={0}
                    step={0.01}
                    onChange={(e) => setEditValue(Number(e.target.value))}
                    disabled={saving}
                    style={{ maxWidth: 110 }}
                  />
                ) : (
                  acc.balance
                )}
              </td>
              <td style={{ whiteSpace: 'nowrap' }}>
                {editingId === acc.id ? (
                  <>
                    <button
                      className='btn btn-success btn-sm me-1'
                      onClick={() => handleSave(acc)}
                      disabled={saving}
                    >
                      {saving ? 'A guardar...' : 'Guardar'}
                    </button>
                    <button
                      className='btn btn-secondary btn-sm'
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className='btn btn-outline-primary btn-sm me-1'
                      onClick={() => handleEdit(acc)}
                    >
                      Editar
                    </button>
                    <button
                      className='btn btn-danger btn-sm account-delete-btn'
                      onClick={() => onDelete(acc.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx='true'>{`
        .modern-account-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: rgba(255, 255, 255, 0.98);
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(80, 80, 120, 0.13);
          overflow: hidden;
        }
        .modern-account-table thead tr {
          background: linear-gradient(
            135deg,
            #764ba2 0%,
            #667eea 100%
          ) !important;
        }
        .modern-account-table thead th {
          color: #f8f9fa;
          font-weight: 700;
          letter-spacing: 0.03em;
          border: none;
          padding: 0.85rem 1rem;
          text-shadow:
            0 2px 8px rgba(60, 60, 90, 0.18),
            0 1px 0 #2228;
          background: rgba(0, 0, 0, 0.1);
          opacity: 0.98;
        }
        .modern-account-table tbody tr.even {
          background: rgba(245, 247, 255, 0.85);
        }
        .modern-account-table tbody tr.odd {
          background: rgba(255, 255, 255, 0.65);
        }
        .modern-account-table tbody tr.account-row {
          transition:
            box-shadow 0.2s,
            transform 0.2s,
            background 0.2s;
        }
        .modern-account-table tbody tr.account-row:hover {
          background: linear-gradient(90deg, #e0f7fa 0%, #f3e7fa 100%);
          box-shadow: 0 4px 18px rgba(80, 80, 120, 0.1);
          transform: scale(1.012);
        }
        .modern-account-table td {
          padding: 0.8rem 1rem;
          border: none;
          font-weight: 500;
          color: #2d2d3a;
          vertical-align: middle;
        }
        .modern-account-table td:last-child {
          text-align: right;
        }
        .account-balance-input {
          border-radius: 8px;
          border: 1.5px solid #bdbdbd;
          font-weight: 600;
          background: #f8fafd;
          box-shadow: 0 1px 4px rgba(80, 80, 120, 0.06);
          padding: 0.2rem 0.5rem;
          font-size: 1rem;
          max-width: 110px;
          display: inline-block;
        }
        .account-delete-btn {
          border-radius: 8px;
          font-weight: 600;
          padding: 0.35rem 1.1rem;
          box-shadow: 0 2px 8px rgba(220, 53, 69, 0.08);
          transition:
            background 0.2s,
            box-shadow 0.2s,
            transform 0.2s;
        }
        .account-delete-btn:hover {
          background: #c82333 !important;
          box-shadow: 0 4px 16px rgba(220, 53, 69, 0.18);
          transform: translateY(-2px) scale(1.04);
        }
        .table-responsive.account-table {
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        @media (max-width: 768px) {
          .modern-account-table thead th,
          .modern-account-table td {
            padding: 0.6rem 0.5rem;
          }
          .modern-account-table {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}

export { AccountForm, AccountTable };
