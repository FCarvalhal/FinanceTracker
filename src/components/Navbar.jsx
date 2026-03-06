import MonthSelector from './MonthSelector';

function Navbar({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  rightContent,
}) {
  return (
    <nav
      className='navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4'
      style={{ minHeight: 64 }}
    >
      <div className='container-fluid'>
        <span
          className='navbar-brand fw-bold fs-4'
          style={{ letterSpacing: 0.5 }}
        >
          <i className='bi bi-pie-chart-fill me-2 text-primary' />
          Personal Finance Tracker
        </span>
        <div className='d-flex align-items-center gap-3 ms-auto'>
          <MonthSelector
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={onMonthChange}
            onYearChange={onYearChange}
            compact
          />
          {rightContent ? (
            <span className='ms-2'>{rightContent}</span>
          ) : (
            <span
              className='d-inline-flex align-items-center justify-content-center rounded-circle bg-light border ms-2'
              style={{ width: 40, height: 40 }}
            >
              <i className='bi bi-person-circle fs-4 text-secondary' />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
