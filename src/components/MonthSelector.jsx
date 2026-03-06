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
    <div
      className='card mb-4'
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div className='card-body'>
        <h5 className='card-title text-white mb-3'>📅 Selecionar Período</h5>
        <div className='row'>
          <div className='col-md-6 mb-2'>
            <label
              htmlFor='monthSelect'
              className='form-label text-white fw-semibold'
            >
              📆 Mês
            </label>
            <select
              id='monthSelect'
              className='form-select form-select-lg'
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              style={{
                borderRadius: '10px',
                border: '2px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.95)',
                fontWeight: '600',
              }}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className='col-md-6 mb-2'>
            <label
              htmlFor='yearSelect'
              className='form-label text-white fw-semibold'
            >
              📅 Ano
            </label>
            <select
              id='yearSelect'
              className='form-select form-select-lg'
              value={selectedYear}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
              style={{
                borderRadius: '10px',
                border: '2px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.95)',
                fontWeight: '600',
              }}
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
    </div>
  );
};

export default MonthSelector;
