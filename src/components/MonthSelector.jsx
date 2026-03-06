const MonthSelector = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  return (
    <div className='month-card'>
      <div className='card-body'>
        <h5 className='card-title'>📅 Selecionar Período</h5>
        <div className='row'>
          <div className='col-md-6 mb-2'>
            <label htmlFor='monthSelect' className='form-label'>
              📆 Mês
            </label>
            <select
              id='monthSelect'
              className='form-select month-select'
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-6 mb-2'>
            <label htmlFor='yearSelect' className='form-label'>
              📅 Ano
            </label>
            <select
              id='yearSelect'
              className='form-select month-select'
              value={selectedYear}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ====== INLINE STYLES ====== */}
      <style jsx='true'>{`
        .month-card {
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 100%
          ) !important;
          border-radius: 18px !important;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18) !important;
          padding: 1.5rem !important;
          margin-bottom: 1.5rem !important;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease !important;
        }

        .month-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.24) !important;
        }

        .month-card .card-title {
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 1.2rem !important;
          margin-bottom: 1rem !important;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
        }

        .month-card .form-label {
          color: #ffffff !important;
          font-weight: 600 !important;
          font-size: 0.9rem !important;
        }

        .month-select {
          border-radius: 12px !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
          background: rgba(255, 255, 255, 0.95) !important;
          font-weight: 600 !important;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease !important;
        }

        .month-select:focus {
          border-color: #16a085 !important;
          box-shadow: 0 0 0 3px rgba(22, 160, 133, 0.15) !important;
          transform: translateY(-1px) !important;
        }

        @media (max-width: 768px) {
          .month-card {
            padding: 1rem !important;
          }
          .month-card .card-title {
            font-size: 1.1rem !important;
          }
          .month-select {
            font-size: 0.9rem !important;
            padding: 0.6rem !important;
          }
        }

        @media (max-width: 576px) {
          .month-card {
            padding: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MonthSelector;
