import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { formatCurrency } from '../utils/ocr';

/**
 * Componente para mostrar gráficos de despesas por categoria
 * @param {Array} transactions - Lista de transações
 */
const Chart = ({ transactions }) => {
  // Se não houver transações
  if (!transactions || transactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📊</Text>
        <Text style={styles.emptyText}>Nenhum dado para exibir</Text>
        <Text style={styles.emptySubtext}>
          Adicione despesas para ver os gráficos
        </Text>
      </View>
    );
  }

  // Agrupa despesas por categoria
  const categoryData = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});

  // Cores para cada categoria
  const categoryColors = {
    'Alimentação': '#FF6B6B',
    'Transporte': '#4ECDC4',
    'Lazer': '#95E1D3',
    'Compras': '#FFD93D',
    'Outros': '#A8E6CF',
  };

  // Prepara dados para o gráfico de pizza
  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    amount: amount,
    color: categoryColors[category] || '#999',
    legendFontColor: '#333',
    legendFontSize: 13,
  }));

  // Calcula total
  const totalAmount = Object.values(categoryData).reduce((sum, val) => sum + val, 0);

  // Prepara dados para o gráfico de barras
  const barData = {
    labels: Object.keys(categoryData).map(cat => {
      // Abrevia o nome se for muito longo
      return cat.length > 8 ? cat.substring(0, 7) + '.' : cat;
    }),
    datasets: [{
      data: Object.values(categoryData)
    }]
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      {/* Card com total geral */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total Gasto</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
        <Text style={styles.totalSubtext}>
          {transactions.length} {transactions.length === 1 ? 'despesa' : 'despesas'} registradas
        </Text>
      </View>

      {/* Gráfico de Pizza */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>📊 Distribuição por Categoria</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 60}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Gráfico de Barras */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>📈 Gastos por Categoria</Text>
        <BarChart
          data={barData}
          width={screenWidth - 60}
          height={220}
          yAxisLabel="R$ "
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 10,
            },
          }}
          style={styles.chart}
          showValuesOnTopOfBars
          fromZero
        />
      </View>

      {/* Lista detalhada por categoria */}
      <View style={styles.categoryListCard}>
        <Text style={styles.chartTitle}>💰 Detalhamento</Text>
        {Object.entries(categoryData)
          .sort((a, b) => b[1] - a[1])
          .map(([category, amount]) => {
            const percentage = (amount / totalAmount * 100).toFixed(1);
            return (
              <View key={category} style={styles.categoryItem}>
                <View style={styles.categoryItemLeft}>
                  <View
                    style={[
                      styles.categoryDot,
                      { backgroundColor: categoryColors[category] || '#999' }
                    ]}
                  />
                  <Text style={styles.categoryName}>{category}</Text>
                </View>
                <View style={styles.categoryItemRight}>
                  <Text style={styles.categoryAmount}>
                    {formatCurrency(amount)}
                  </Text>
                  <Text style={styles.categoryPercentage}>{percentage}%</Text>
                </View>
              </View>
            );
          })}
      </View>

      {/* Estatísticas adicionais */}
      <View style={styles.statsCard}>
        <Text style={styles.chartTitle}>📈 Estatísticas</Text>
        
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Categoria com mais gastos:</Text>
          <Text style={styles.statValue}>
            {Object.entries(categoryData).sort((a, b) => b[1] - a[1])[0][0]}
          </Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Gasto médio por transação:</Text>
          <Text style={styles.statValue}>
            {formatCurrency(totalAmount / transactions.length)}
          </Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Maior despesa:</Text>
          <Text style={styles.statValue}>
            {formatCurrency(Math.max(...transactions.map(t => t.amount)))}
          </Text>
        </View>

        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Menor despesa:</Text>
          <Text style={styles.statValue}>
            {formatCurrency(Math.min(...transactions.map(t => t.amount)))}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  totalCard: {
    backgroundColor: '#4CAF50',
    margin: 15,
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  totalSubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  chartCard: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  categoryListCard: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  categoryItemRight: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#4CAF50',
  },
  categoryPercentage: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  statsCard: {
    backgroundColor: '#fff',
    margin: 15,
    marginTop: 0,
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
});

export default Chart;
