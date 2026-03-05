import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  groupExpensesByCategory,
} from '../utils/financeUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Charts = ({ transactions }) => {
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const expensesByCategory = groupExpensesByCategory(transactions);

  // Bar Chart Data - Income vs Expenses
  const barChartData = {
    labels: ['💰 Receitas', '💸 Despesas'],
    datasets: [
      {
        label: 'Valor (€)',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['rgba(39, 174, 96, 0.8)', 'rgba(231, 76, 60, 0.8)'],
        borderColor: ['rgba(39, 174, 96, 1)', 'rgba(231, 76, 60, 1)'],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.95)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: '600',
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 13,
            weight: '600',
          },
        },
      },
    },
  };

  // Pie Chart Data - Expenses by Category
  const pieChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        label: 'Despesas',
        data: Object.values(expensesByCategory),
        backgroundColor: [
          'rgba(231, 76, 60, 0.8)',
          'rgba(52, 152, 219, 0.8)',
          'rgba(243, 156, 18, 0.8)',
          'rgba(46, 204, 113, 0.8)',
          'rgba(155, 89, 182, 0.8)',
          'rgba(26, 188, 156, 0.8)',
          'rgba(52, 73, 94, 0.8)',
          'rgba(230, 126, 34, 0.8)',
        ],
        borderColor: [
          'rgba(231, 76, 60, 1)',
          'rgba(52, 152, 219, 1)',
          'rgba(243, 156, 18, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(155, 89, 182, 1)',
          'rgba(26, 188, 156, 1)',
          'rgba(52, 73, 94, 1)',
          'rgba(230, 126, 34, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: '600',
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.95)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
      },
    },
  };

  const hasExpenses = Object.keys(expensesByCategory).length > 0;

  return (
    <div className='mb-4'>
      <div className='row g-4'>
        <div className='col-md-6'>
          <div
            className='card'
            style={{ border: '2px solid #e9ecef', height: '100%' }}
          >
            <div className='card-body'>
              <h5
                className='card-title'
                style={{
                  color: '#2c3e50',
                  fontSize: '1.3rem',
                  marginBottom: '1.5rem',
                  fontWeight: '700',
                }}
              >
                📊 Receitas vs Despesas
              </h5>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>

        <div className='col-md-6'>
          <div
            className='card'
            style={{ border: '2px solid #e9ecef', height: '100%' }}
          >
            <div className='card-body'>
              <h5
                className='card-title'
                style={{
                  color: '#2c3e50',
                  fontSize: '1.3rem',
                  marginBottom: '1.5rem',
                  fontWeight: '700',
                }}
              >
                🍰 Despesas por Categoria
              </h5>
              {hasExpenses ? (
                <Pie data={pieChartData} options={pieChartOptions} />
              ) : (
                <div className='text-center py-5'>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    📊
                  </div>
                  <p className='text-muted mb-0' style={{ fontWeight: '500' }}>
                    Sem dados de despesas para este mês
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
