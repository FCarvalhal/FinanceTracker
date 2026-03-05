import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { formatCurrency } from '../utils/ocr';
import { calculateBalances } from '../utils/storage';

/**
 * Componente para mostrar o saldo de cada pessoa
 * @param {Array} transactions - Lista de transações
 */
const Balance = ({ transactions }) => {
  // Calcula os saldos
  const balances = calculateBalances(transactions);
  const balanceEntries = Object.entries(balances).sort((a, b) => b[1] - a[1]);

  // Se não houver transações
  if (balanceEntries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>💰</Text>
        <Text style={styles.emptyText}>Nenhum saldo para calcular</Text>
        <Text style={styles.emptySubtext}>
          Adicione despesas para ver quem deve e quem recebe
        </Text>
      </View>
    );
  }

  // Calcula total de dívidas e créditos
  const totalDebt = balanceEntries
    .filter(([, balance]) => balance < 0)
    .reduce((sum, [, balance]) => sum + Math.abs(balance), 0);
  
  const totalCredit = balanceEntries
    .filter(([, balance]) => balance > 0)
    .reduce((sum, [, balance]) => sum + balance, 0);

  return (
    <ScrollView style={styles.container}>
      {/* Resumo geral */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Resumo Geral</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total a Receber</Text>
            <Text style={styles.summaryCredit}>{formatCurrency(totalCredit)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total a Pagar</Text>
            <Text style={styles.summaryDebt}>{formatCurrency(totalDebt)}</Text>
          </View>
        </View>
      </View>

      {/* Lista de saldos por pessoa */}
      <View style={styles.balanceList}>
        <Text style={styles.sectionTitle}>Saldo por Pessoa</Text>
        {balanceEntries.map(([person, balance]) => {
          const isPositive = balance > 0;
          const isZero = Math.abs(balance) < 0.01;
          
          return (
            <View key={person} style={styles.balanceCard}>
              <View style={styles.balanceHeader}>
                <View style={styles.personInfo}>
                  <Text style={styles.personIcon}>
                    {isZero ? '✅' : isPositive ? '💚' : '💸'}
                  </Text>
                  <Text style={styles.personName}>{person}</Text>
                </View>
                <Text
                  style={[
                    styles.balanceAmount,
                    isPositive && styles.balancePositive,
                    !isPositive && !isZero && styles.balanceNegative,
                    isZero && styles.balanceZero,
                  ]}
                >
                  {formatCurrency(Math.abs(balance))}
                </Text>
              </View>
              
              <View style={styles.balanceStatus}>
                {isZero ? (
                  <Text style={styles.statusTextZero}>
                    ✨ Conta zerada!
                  </Text>
                ) : isPositive ? (
                  <Text style={styles.statusTextPositive}>
                    👍 Deve receber
                  </Text>
                ) : (
                  <Text style={styles.statusTextNegative}>
                    💳 Deve pagar
                  </Text>
                )}
              </View>

              {/* Barra de progresso visual */}
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${Math.min(Math.abs(balance) / (totalCredit || 1) * 100, 100)}%`,
                      backgroundColor: isZero ? '#4CAF50' : isPositive ? '#4CAF50' : '#f44336',
                    }
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Sugestões de pagamento */}
      <View style={styles.suggestionsCard}>
        <Text style={styles.sectionTitle}>💡 Sugestões de Acerto</Text>
        <Text style={styles.suggestionsIntro}>
          Para simplificar os pagamentos:
        </Text>
        {generatePaymentSuggestions(balances).map((suggestion, index) => (
          <View key={index} style={styles.suggestionItem}>
            <Text style={styles.suggestionText}>
              <Text style={styles.suggestionPerson}>{suggestion.from}</Text>
              {' → '}
              <Text style={styles.suggestionPerson}>{suggestion.to}</Text>
              {': '}
              <Text style={styles.suggestionAmount}>
                {formatCurrency(suggestion.amount)}
              </Text>
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

/**
 * Gera sugestões otimizadas de pagamento
 * @param {Object} balances - Objeto com saldos
 * @returns {Array} - Lista de sugestões
 */
const generatePaymentSuggestions = (balances) => {
  const suggestions = [];
  
  // Separa devedores e credores
  const debtors = Object.entries(balances)
    .filter(([, balance]) => balance < 0)
    .map(([person, balance]) => ({ person, amount: Math.abs(balance) }))
    .sort((a, b) => b.amount - a.amount);
  
  const creditors = Object.entries(balances)
    .filter(([, balance]) => balance > 0)
    .map(([person, balance]) => ({ person, amount: balance }))
    .sort((a, b) => b.amount - a.amount);

  // Algoritmo guloso para minimizar transações
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    
    const payment = Math.min(debtor.amount, creditor.amount);
    
    if (payment > 0.01) {
      suggestions.push({
        from: debtor.person,
        to: creditor.person,
        amount: payment
      });
    }
    
    debtor.amount -= payment;
    creditor.amount -= payment;
    
    if (debtor.amount < 0.01) i++;
    if (creditor.amount < 0.01) j++;
  }
  
  return suggestions;
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
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  summaryCredit: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
  },
  summaryDebt: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f44336',
  },
  balanceList: {
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  balanceCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  personInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  personIcon: {
    fontSize: 24,
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  balancePositive: {
    color: '#4CAF50',
  },
  balanceNegative: {
    color: '#f44336',
  },
  balanceZero: {
    color: '#999',
  },
  balanceStatus: {
    marginBottom: 8,
  },
  statusTextPositive: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  statusTextNegative: {
    fontSize: 12,
    color: '#f44336',
    fontWeight: '600',
  },
  statusTextZero: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  suggestionsCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionsIntro: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  suggestionPerson: {
    fontWeight: '600',
    color: '#2196F3',
  },
  suggestionAmount: {
    fontWeight: '700',
    color: '#4CAF50',
  },
});

export default Balance;
