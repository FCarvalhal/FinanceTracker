import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// Componentes
import CameraInput from './components/CameraInput';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Balance from './components/Balance';
import Chart from './components/Chart';

// Utilitários
import {
  saveTransaction,
  getTransactions,
  deleteTransaction,
  savePeople,
  getPeople,
} from './utils/storage';

/**
 * App principal de Finanças Pessoais
 * Permite adicionar despesas via câmera com OCR, dividir entre pessoas e visualizar gráficos
 */
export default function App() {
  // Estados principais
  const [transactions, setTransactions] = useState([]);
  const [people, setPeopleState] = useState(['João', 'Maria', 'Pedro']); // Pessoas iniciais
  const [activeTab, setActiveTab] = useState('add'); // 'add', 'list', 'balance', 'chart'
  const [showCamera, setShowCamera] = useState(false);
  const [capturedValue, setCapturedValue] = useState(0);
  const [capturedImage, setCapturedImage] = useState(null);

  // Carrega dados ao iniciar
  useEffect(() => {
    loadData();
  }, []);

  // Carrega transações e pessoas do AsyncStorage
  const loadData = async () => {
    try {
      const savedTransactions = await getTransactions();
      const savedPeople = await getPeople();
      
      setTransactions(savedTransactions);
      if (savedPeople.length > 0) {
        setPeopleState(savedPeople);
      } else {
        // Salva pessoas iniciais se não houver nenhuma
        await savePeople(people);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados salvos');
    }
  };

  // Callback quando valor é extraído da câmera/OCR
  const handleValueExtracted = (value, imageUri) => {
    setCapturedValue(value);
    setCapturedImage(imageUri);
    setShowCamera(false);
    // Abre o formulário automaticamente
    setActiveTab('add');
  };

  // Manipula envio do formulário
  const handleFormSubmit = async (data) => {
    if (data.type === 'add_person') {
      // Adiciona nova pessoa
      const updatedPeople = [...people, data.person];
      setPeopleState(updatedPeople);
      await savePeople(updatedPeople);
      Alert.alert('Sucesso', `${data.person} foi adicionado(a)!`);
    } else if (data.type === 'add_transaction') {
      // Adiciona nova transação
      try {
        const savedTransaction = await saveTransaction(data.transaction);
        setTransactions([...transactions, savedTransaction]);
        
        // Limpa valores capturados
        setCapturedValue(0);
        setCapturedImage(null);
        
        Alert.alert(
          'Sucesso! 🎉',
          'Despesa adicionada com sucesso',
          [
            { text: 'Adicionar outra', onPress: () => setActiveTab('add') },
            { text: 'Ver lista', onPress: () => setActiveTab('list') }
          ]
        );
      } catch (error) {
        console.error('Erro ao salvar transação:', error);
        Alert.alert('Erro', 'Não foi possível salvar a despesa');
      }
    }
  };

  // Deleta uma transação
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions(transactions.filter(t => t.id !== id));
      Alert.alert('Sucesso', 'Despesa excluída');
    } catch (error) {
      console.error('Erro ao deletar transação:', error);
      Alert.alert('Erro', 'Não foi possível excluir a despesa');
    }
  };

  // Renderiza o conteúdo baseado na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'add':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.screenTitle}>➕ Adicionar Despesa</Text>
            
            {/* Botão para abrir câmera */}
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => setShowCamera(true)}
            >
              <Text style={styles.cameraButtonIcon}>📷</Text>
              <Text style={styles.cameraButtonText}>Escanear Recibo com Câmera</Text>
            </TouchableOpacity>

            {/* Formulário */}
            <TransactionForm
              onSubmit={handleFormSubmit}
              availablePeople={people}
              initialAmount={capturedValue}
              imageUri={capturedImage}
            />
          </View>
        );

      case 'list':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.screenTitle}>📝 Histórico de Despesas</Text>
            <TransactionList
              transactions={transactions}
              onDelete={handleDeleteTransaction}
            />
          </View>
        );

      case 'balance':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.screenTitle}>💰 Saldo por Pessoa</Text>
            <Balance transactions={transactions} />
          </View>
        );

      case 'chart':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.screenTitle}>📊 Gráficos</Text>
            <Chart transactions={transactions} />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💰 Finance Tracker</Text>
        <Text style={styles.headerSubtitle}>
          {transactions.length} {transactions.length === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'add' && styles.tabActive]}
          onPress={() => setActiveTab('add')}
        >
          <Text style={[styles.tabIcon, activeTab === 'add' && styles.tabIconActive]}>
            ➕
          </Text>
          <Text style={[styles.tabText, activeTab === 'add' && styles.tabTextActive]}>
            Adicionar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'list' && styles.tabActive]}
          onPress={() => setActiveTab('list')}
        >
          <Text style={[styles.tabIcon, activeTab === 'list' && styles.tabIconActive]}>
            📝
          </Text>
          <Text style={[styles.tabText, activeTab === 'list' && styles.tabTextActive]}>
            Lista
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'balance' && styles.tabActive]}
          onPress={() => setActiveTab('balance')}
        >
          <Text style={[styles.tabIcon, activeTab === 'balance' && styles.tabIconActive]}>
            💰
          </Text>
          <Text style={[styles.tabText, activeTab === 'balance' && styles.tabTextActive]}>
            Saldo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'chart' && styles.tabActive]}
          onPress={() => setActiveTab('chart')}
        >
          <Text style={[styles.tabIcon, activeTab === 'chart' && styles.tabIconActive]}>
            📊
          </Text>
          <Text style={[styles.tabText, activeTab === 'chart' && styles.tabTextActive]}>
            Gráficos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal da Câmera */}
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <CameraInput
          onValueExtracted={handleValueExtracted}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  cameraButton: {
    backgroundColor: '#2196F3',
    margin: 20,
    marginTop: 10,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  cameraButtonIcon: {
    fontSize: 24,
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderTopWidth: 3,
    borderTopColor: '#4CAF50',
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#4CAF50',
    fontWeight: '700',
  },
});
