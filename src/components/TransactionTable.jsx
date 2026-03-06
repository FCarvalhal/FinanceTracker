import { formatCurrency, formatDate } from '../utils/financeUtils';

const TransactionTable = ({ transactions, onDelete, accounts = [] }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div
        className='card mb-4'
        style={{
          borderRadius: '16px',
          background: '#f8f9fa',
          padding: '2rem',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
        <h5 style={{ color: '#6c757d', fontWeight: 600 }}>
          Nenhuma transação encontrada
        </h5>
        <p className='text-muted'>
          Adicione sua primeira transação para começar!
        </p>
      </div>
    );
  }

  const getAccountName = (account_id) => {
    const acc = accounts.find((a) => a.id === account_id);
    return acc ? acc.name : '—';
  };

  return (
    <div
      className='card mb-4'
      style={{
        borderRadius: '16px',
        border: '2px solid #e9ecef',
        padding: '1.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
    >
      <h5
        style={{
          color: '#2c3e50',
          fontWeight: 700,
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        📋 Histórico de Transações
      </h5>
      <div className='table-responsive'>
        <table className='table table-hover mb-0'>
          <thead>
            <tr>
              <th>📅 Data</th>
              <th>📝 Descrição</th>
              <th>🏦 Conta</th>
              <th>📂 Categoria</th>
              <th className='text-center'>🏷️ Tipo</th>
              <th className='text-end'>💰 Valor</th>
              <th className='text-center'>⚙️ Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} style={{ transition: 'all 0.2s' }}>
                <td style={{ fontWeight: 500 }}>{formatDate(t.date)}</td>
                <td style={{ fontWeight: 600 }}>{t.description}</td>
                <td>{getAccountName(t.account_id)}</td>
                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      background:
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: '#fff',
                      padding: '0.5rem 0.875rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    {t.category}
                  </span>
                </td>
                <td className='text-center'>
                  <span
                    style={{
                      display: 'inline-block',
                      background:
                        t.type === 'income'
                          ? 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
                          : 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                      color: '#fff',
                      padding: '0.5rem 0.875rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    {t.type === 'income' ? '💵 Receita' : '💸 Despesa'}
                  </span>
                </td>
                <td
                  className='text-end'
                  style={{
                    color: t.type === 'income' ? '#27ae60' : '#e74c3c',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                  }}
                >
                  {t.type === 'income' ? '+' : '-'}
                  {formatCurrency(t.amount)}
                </td>
                <td className='text-center'>
                  <button
                    onClick={() => onDelete(t.id)}
                    style={{
                      borderRadius: '8px',
                      padding: '0.4rem 0.8rem',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      background: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = '#c0392b')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = '#e74c3c')
                    }
                    title='Eliminar transação'
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
