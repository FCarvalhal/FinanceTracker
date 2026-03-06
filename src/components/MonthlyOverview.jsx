import { formatCurrency } from '../utils/financeUtils';

function MonthlyOverview({ monthlyData }) {
  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className='card mb-4'>
        <div className='card-body'>
          <h5 className='card-title'>📊 Resumo Global por Mês</h5>
          <p className='text-muted'>Nenhuma transação registrada ainda.</p>
        </div>
      </div>
    );
  }

  // Calculate totals across all months
  const totals = monthlyData.reduce(
    (acc, item) => ({
      income: acc.income + item.income,
      expenses: acc.expenses + item.expenses,
      balance: acc.balance + item.balance,
    }),
    { income: 0, expenses: 0, balance: 0 },
  );

  return (
    <>
      {/* Summary Cards */}
      <div className='row mb-4'>
        <div className='col-md-4'>
          <div className='card text-white bg-success mb-3'>
            <div className='card-body'>
              <h6 className='card-title'>💰 Total Receitas</h6>
              <h3 className='mb-0'>{formatCurrency(totals.income)}</h3>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div className='card text-white bg-danger mb-3'>
            <div className='card-body'>
              <h6 className='card-title'>💸 Total Despesas</h6>
              <h3 className='mb-0'>{formatCurrency(totals.expenses)}</h3>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <div
            className={`card text-white mb-3 ${totals.balance >= 0 ? 'bg-primary' : 'bg-warning'}`}
          >
            <div className='card-body'>
              <h6 className='card-title'>💵 Saldo Global</h6>
              <h3 className='mb-0'>{formatCurrency(totals.balance)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Table */}
      <div className='card mb-4'>
        <div className='card-body'>
          <h5 className='card-title mb-3'>📊 Resumo por Mês</h5>

          <div className='table-responsive'>
            <table className='table table-hover table-sm'>
              <thead className='table-dark'>
                <tr>
                  <th>Mês</th>
                  <th>Ano</th>
                  <th className='text-end'>Receitas</th>
                  <th className='text-end'>Despesas</th>
                  <th className='text-end'>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((item, index) => (
                  <tr key={`${item.year}-${item.month}`}>
                    <td>
                      <strong>{item.monthName}</strong>
                    </td>
                    <td>{item.year}</td>
                    <td className='text-end text-success'>
                      {formatCurrency(item.income)}
                    </td>
                    <td className='text-end text-danger'>
                      {formatCurrency(item.expenses)}
                    </td>
                    <td
                      className={`text-end fw-bold ${item.balance >= 0 ? 'text-success' : 'text-danger'}`}
                    >
                      {formatCurrency(item.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className='table-secondary'>
                <tr>
                  <td colSpan='2'>
                    <strong>TOTAL GLOBAL</strong>
                  </td>
                  <td className='text-end text-success fw-bold'>
                    {formatCurrency(totals.income)}
                  </td>
                  <td className='text-end text-danger fw-bold'>
                    {formatCurrency(totals.expenses)}
                  </td>
                  <td
                    className={`text-end fw-bold ${totals.balance >= 0 ? 'text-success' : 'text-danger'}`}
                  >
                    {formatCurrency(totals.balance)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default MonthlyOverview;
