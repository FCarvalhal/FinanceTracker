import React from 'react';
import SummaryCards from './SummaryCards';

const Dashboard = ({ transactions, selectedMonth, selectedYear }) => {
  return (
    <div className='dashboard mb-4'>
      <h2 className='mb-3' style={{ color: '#2c3e50', fontWeight: '700' }}>
        📊 Painel de Controlo - {selectedMonth} {selectedYear}
      </h2>
      <SummaryCards
        transactions={transactions}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default Dashboard;
