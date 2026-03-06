import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  formatCurrency,
} from '../utils/financeUtils';

const SummaryCards = ({ transactions }) => {
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const balance = calculateBalance(transactions);

  return (
    <div className='row g-4'>
      <div className='col-md-4'>
        <div
          className='card text-white border-0'
          style={{
            background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
            transition: 'all 0.3s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'translateY(-8px)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = 'translateY(0)')
          }
        >
          <div className='card-body p-4'>
            <div className='d-flex justify-content-between align-items-start mb-3'>
              <div>
                <h6
                  className='text-uppercase mb-1'
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    opacity: '0.9',
                  }}
                >
                  💰 Total Receitas
                </h6>
              </div>
              <div
                style={{
                  fontSize: '2.5rem',
                  opacity: '0.3',
                  lineHeight: '1',
                }}
              >
                📈
              </div>
            </div>
            <h2
              className='mb-0'
              style={{
                fontSize: '2.2rem',
                fontWeight: '800',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {formatCurrency(totalIncome)}
            </h2>
            <p
              className='mb-0 mt-2'
              style={{
                fontSize: '0.85rem',
                opacity: '0.9',
              }}
            >
              Total de entradas
            </p>
          </div>
        </div>
      </div>

      <div className='col-md-4'>
        <div
          className='card text-white border-0'
          style={{
            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            transition: 'all 0.3s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'translateY(-8px)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = 'translateY(0)')
          }
        >
          <div className='card-body p-4'>
            <div className='d-flex justify-content-between align-items-start mb-3'>
              <div>
                <h6
                  className='text-uppercase mb-1'
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    opacity: '0.9',
                  }}
                >
                  💸 Total Despesas
                </h6>
              </div>
              <div
                style={{
                  fontSize: '2.5rem',
                  opacity: '0.3',
                  lineHeight: '1',
                }}
              >
                📉
              </div>
            </div>
            <h2
              className='mb-0'
              style={{
                fontSize: '2.2rem',
                fontWeight: '800',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {formatCurrency(totalExpenses)}
            </h2>
            <p
              className='mb-0 mt-2'
              style={{
                fontSize: '0.85rem',
                opacity: '0.9',
              }}
            >
              Total de saídas
            </p>
          </div>
        </div>
      </div>

      <div className='col-md-4'>
        <div
          className='card text-white border-0'
          style={{
            background:
              balance >= 0
                ? 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
                : 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
            transition: 'all 0.3s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = 'translateY(-8px)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = 'translateY(0)')
          }
        >
          <div className='card-body p-4'>
            <div className='d-flex justify-content-between align-items-start mb-3'>
              <div>
                <h6
                  className='text-uppercase mb-1'
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '1.5px',
                    opacity: '0.9',
                  }}
                >
                  💵 Saldo
                </h6>
              </div>
              <div
                style={{
                  fontSize: '2.5rem',
                  opacity: '0.3',
                  lineHeight: '1',
                }}
              >
                {balance >= 0 ? '✅' : '⚠️'}
              </div>
            </div>
            <h2
              className='mb-0'
              style={{
                fontSize: '2.2rem',
                fontWeight: '800',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {formatCurrency(balance)}
            </h2>
            <p
              className='mb-0 mt-2'
              style={{
                fontSize: '0.85rem',
                opacity: '0.9',
              }}
            >
              {balance >= 0 ? 'Situação positiva' : 'Atenção necessária'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
