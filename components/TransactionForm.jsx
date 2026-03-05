import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { formatCurrency } from '../utils/ocr';

/**
 * Componente para formulário de adicionar/editar transação
 * @param {Function} onSubmit - Callback ao submeter o formulário
 * @param {Array} availablePeople - Lista de pessoas disponíveis
 * @param {number} initialAmount - Valor inicial (quando vem do OCR)
 * @param {string} imageUri - URI da imagem capturada
 */
const TransactionForm = ({ 
  onSubmit, 
  availablePeople, 
  initialAmount = 0,
  imageUri = null
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(initialAmount > 0 ? initialAmount.toString() : '');
  const [category, setCategory] = useState('Outros');
  const [paidBy, setPaidBy] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [newPersonName, setNewPersonName] = useState('');

  const categories = ['Alimentação', 'Transporte', 'Lazer', 'Compras', 'Outros'];

  useEffect(() => {
    if (initialAmount > 0) {
      setAmount(initialAmount.toString());
    }
  }, [initialAmount]);

  // Adiciona/remove pessoa da seleção
  const togglePersonSelection = (person) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople(selectedPeople.filter(p => p !== person));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  // Adiciona nova pessoa
  const addNewPerson = () => {
    if (newPersonName.trim()) {
      const trimmed = newPersonName.trim();
      if (!availablePeople.includes(trimmed)) {
        onSubmit({
          type: 'add_person',
          person: trimmed
        });
      }
      setNewPersonName('');
    }
  };

  // Valida e submete o formulário
  const handleSubmit = () => {
    // Validações
    if (!description.trim()) {
      Alert.alert('Erro', 'Por favor, adicione uma descrição');
      return;
    }

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    if (!paidBy) {
      Alert.alert('Erro', 'Selecione quem pagou');
      return;
    }

    if (selectedPeople.length === 0) {
      Alert.alert('Erro', 'Selecione pelo menos uma pessoa para dividir');
      return;
    }

    // Cria o objeto de transação
    const transaction = {
      description: description.trim(),
      amount: numAmount,
      category,
      paidBy,
      splitBetween: selectedPeople,
      imageUri: imageUri || null,
    };

    onSubmit({
      type: 'add_transaction',
      transaction
    });

    // Limpa o formulário
    setDescription('');
    setAmount('');
    setCategory('Outros');
    setPaidBy('');
    setSelectedPeople([]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Descrição */}
      <View style={styles.section}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Jantar no restaurante"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Valor */}
      <View style={styles.section}>
        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
        {amount && !isNaN(parseFloat(amount)) && (
          <Text style={styles.previewText}>
            {formatCurrency(parseFloat(amount))}
          </Text>
        )}
      </View>

      {/* Categoria */}
      <View style={styles.section}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonActive
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === cat && styles.categoryButtonTextActive
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quem pagou */}
      <View style={styles.section}>
        <Text style={styles.label}>Quem Pagou?</Text>
        <View style={styles.peopleContainer}>
          {availablePeople.map((person) => (
            <TouchableOpacity
              key={person}
              style={[
                styles.personButton,
                paidBy === person && styles.personButtonActive
              ]}
              onPress={() => setPaidBy(person)}
            >
              <Text
                style={[
                  styles.personButtonText,
                  paidBy === person && styles.personButtonTextActive
                ]}
              >
                {person}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Dividir entre */}
      <View style={styles.section}>
        <Text style={styles.label}>Dividir Entre</Text>
        <View style={styles.peopleContainer}>
          {availablePeople.map((person) => (
            <TouchableOpacity
              key={person}
              style={[
                styles.personButton,
                selectedPeople.includes(person) && styles.personButtonActive
              ]}
              onPress={() => togglePersonSelection(person)}
            >
              <Text
                style={[
                  styles.personButtonText,
                  selectedPeople.includes(person) && styles.personButtonTextActive
                ]}
              >
                {person}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Valor por pessoa */}
        {amount && selectedPeople.length > 0 && !isNaN(parseFloat(amount)) && (
          <Text style={styles.splitInfo}>
            {formatCurrency(parseFloat(amount) / selectedPeople.length)} por pessoa
          </Text>
        )}
      </View>

      {/* Adicionar nova pessoa */}
      <View style={styles.section}>
        <Text style={styles.label}>Adicionar Nova Pessoa</Text>
        <View style={styles.addPersonContainer}>
          <TextInput
            style={[styles.input, styles.addPersonInput]}
            placeholder="Nome da pessoa"
            value={newPersonName}
            onChangeText={setNewPersonName}
          />
          <TouchableOpacity
            style={styles.addPersonButton}
            onPress={addNewPerson}
          >
            <Text style={styles.addPersonButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão de enviar */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Adicionar Despesa</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  previewText: {
    marginTop: 5,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  categoryButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  peopleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  personButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  personButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  personButtonText: {
    fontSize: 14,
    color: '#666',
  },
  personButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  splitInfo: {
    marginTop: 10,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  addPersonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  addPersonInput: {
    flex: 1,
  },
  addPersonButton: {
    width: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPersonButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TransactionForm;
