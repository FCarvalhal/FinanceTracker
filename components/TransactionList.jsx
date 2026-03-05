import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { formatCurrency } from '../utils/ocr';

/**
 * Componente para listar todas as transações
 * @param {Array} transactions - Lista de transações
 * @param {Function} onDelete - Callback ao deletar transação
 */
const TransactionList = ({ transactions, onDelete }) => {
  // Confirma exclusão
  const confirmDelete = (id, description) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir "${description}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => onDelete(id)
        }
      ]
    );
  };

  // Formata a data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Ícone da categoria
  const getCategoryIcon = (category) => {
    const icons = {
      'Alimentação': '🍽️',
      'Transporte': '🚗',
      'Lazer': '🎉',
      'Compras': '🛍️',
      'Outros': '📝'
    };
    return icons[category] || '📝';
  };

  // Renderiza cada item
  const renderItem = ({ item }) => {
    const amountPerPerson = item.amount / item.splitBetween.length;

    return (
      <View style={styles.card}>
        {/* Cabeçalho do card */}
        <View style={styles.cardHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <TouchableOpacity
            onPress={() => confirmDelete(item.id, item.description)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>

        {/* Imagem do recibo (se existir) */}
        {item.imageUri && (
          <Image source={{ uri: item.imageUri }} style={styles.receiptImage} />
        )}

        {/* Descrição e valor */}
        <View style={styles.cardBody}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.amount}>{formatCurrency(item.amount)}</Text>
        </View>

        {/* Informações de pagamento */}
        <View style={styles.cardFooter}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Pago por:</Text>
            <Text style={styles.infoPaidBy}>{item.paidBy}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dividir entre:</Text>
            <Text style={styles.infoValue}>
              {item.splitBetween.join(', ')}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Por pessoa:</Text>
            <Text style={styles.infoPerPerson}>
              {formatCurrency(amountPerPerson)}
            </Text>
          </View>

          <Text style={styles.date}>{formatDate(item.date)}</Text>
        </View>
      </View>
    );
  };

  // Lista vazia
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📊</Text>
      <Text style={styles.emptyText}>Nenhuma despesa registrada</Text>
      <Text style={styles.emptySubtext}>
        Adicione sua primeira despesa usando a câmera ou manualmente
      </Text>
    </View>
  );

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={renderEmpty}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  receiptImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardBody: {
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4CAF50',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: '#666',
  },
  infoPaidBy: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2196F3',
  },
  infoValue: {
    fontSize: 13,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  infoPerPerson: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
  },
  date: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
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
});

export default TransactionList;
