import { formatCurrency, formatDate } from '../utils/financeUtils';

const TransactionTable = ({ transactions, onDelete, accounts = [] }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className='card mb-4'>
        <div className='card-body text-center py-5'>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📊</div>
          <h5 style={{ color: '#6c757d', fontWeight: '600' }}>
            Nenhuma transação encontrada
          </h5>
          <p className='text-muted'>
            Adicione sua primeira transação para começar!
          </p>
        </div>
      </div>
    );
  }

  // Helper para obter o nome da conta
  const getAccountName = (account_id) => {
    const acc = accounts.find((a) => a.id === account_id);
    return acc ? acc.name : '—';
  };

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
          📋 Histórico de Transações
        </h5>
        <div className='table-responsive'>
          <table className='table table-hover mb-0'>
            <thead>
              <tr>
                <th style={{ width: '12%' }}>📅 Data</th>
                <th style={{ width: '20%' }}>📝 Descrição</th>
                <th style={{ width: '14%' }}>🏦 Conta</th>
                <th style={{ width: '14%' }}>📂 Categoria</th>
                <th style={{ width: '12%' }} className='text-center'>
                  🏷️ Tipo
                </th>
                <th style={{ width: '14%' }} className='text-end'>
                  💰 Valor
                </th>
                <th style={{ width: '14%' }} className='text-center'>
                  ⚙️ Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} style={{ transition: 'all 0.2s' }}>
                  <td style={{ fontWeight: '500' }}>
                    {formatDate(transaction.date)}
                  </td>
                  <td style={{ fontWeight: '600' }}>
                    {transaction.description}
                  </td>
                  <td>{getAccountName(transaction.account_id)}</td>
                  <td>
                    <span
                      className='badge'
                      style={{
                        background:
                          'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '0.5rem 0.875rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                      }}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td className='text-center'>
                    <span
                      className='badge'
                      style={{
                        background:
                          transaction.type === 'income'
                            ? 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)'
                            : 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                        color: 'white',
                        padding: '0.5rem 0.875rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                      }}
                    >
                      {transaction.type === 'income'
                        ? '💵 Receita'
                        : '💸 Despesa'}
                    </span>
                  </td>
                  <td
                    className='text-end'
                    style={{
                      color:
                        transaction.type === 'income' ? '#27ae60' : '#e74c3c',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                    }}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className='text-center'>
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => onDelete(transaction.id)}
                      title='Eliminar transação'
                      style={{
                        borderRadius: '8px',
                        padding: '0.4rem 0.8rem',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                      }}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
