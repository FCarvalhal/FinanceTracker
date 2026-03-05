# 💰 Finance Tracker - App Mobile de Finanças Pessoais

App completo de finanças pessoais desenvolvido com **React Native + Expo**, permitindo:
- 📷 Escanear recibos com câmera e OCR
- 💸 Dividir despesas entre pessoas automaticamente
- 📊 Visualizar gráficos de gastos por categoria
- 💰 Ver saldo de cada pessoa (quem deve/recebe)
- 💾 Persistência local com AsyncStorage

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o App
```bash
npx expo start
```

### 3. Abrir no Dispositivo
- Instale o app **Expo Go** no seu celular (Android/iOS)
- Escaneie o QR Code que aparece no terminal
- O app será carregado automaticamente

## 📱 Funcionalidades

### ✅ Adicionar Despesas
- **Via Câmera**: Tire foto do recibo e o OCR extrai o valor automaticamente
- **Via Galeria**: Escolha uma foto existente
- **Manual**: Insira os dados manualmente
- Categorize a despesa (Alimentação, Transporte, Lazer, Compras, Outros)

### ✅ Divisão Automática
- Selecione quem pagou
- Selecione entre quem dividir
- O app calcula automaticamente quanto cada pessoa deve

### ✅ Lista de Despesas
- Visualize todas as despesas
- Veja descrição, valor, categoria
- Veja quem pagou e entre quem foi dividido
- Delete despesas deslizando

### ✅ Saldo por Pessoa
- Veja quanto cada pessoa deve ou tem a receber
- Sugestões otimizadas de pagamento
- Indicadores visuais de status

### ✅ Gráficos
- Gráfico de pizza: distribuição por categoria
- Gráfico de barras: gastos por categoria
- Estatísticas detalhadas
- Total gasto

## 📂 Estrutura do Projeto

```
FinanceTracker/
├── App.js                      # Arquivo principal
├── app.json                    # Configuração do Expo
├── package.json                # Dependências
├── components/
│   ├── CameraInput.jsx         # Captura de foto e OCR
│   ├── TransactionForm.jsx     # Formulário de despesas
│   ├── TransactionList.jsx     # Lista de despesas
│   ├── Balance.jsx             # Saldo por pessoa
│   └── Chart.jsx               # Gráficos
└── utils/
    ├── ocr.js                  # Processamento OCR
    └── storage.js              # Persistência de dados
```

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **expo-camera** - Acesso à câmera
- **expo-image-picker** - Seleção de imagens
- **Tesseract.js** - OCR (Reconhecimento de texto)
- **AsyncStorage** - Armazenamento local
- **react-native-chart-kit** - Gráficos
- **react-native-svg** - Renderização de SVG

## 📝 Como Usar

1. **Adicionar Pessoa**
   - Na aba "Adicionar", no formulário, digite o nome da nova pessoa
   - Clique no botão "+" para adicionar

2. **Adicionar Despesa via Câmera**
   - Clique em "Escanear Recibo com Câmera"
   - Tire foto do recibo
   - O OCR processará e extrairá o valor
   - Confirme ou corrija o valor
   - Preencha os demais campos (descrição, categoria, etc.)

3. **Adicionar Despesa Manual**
   - Na aba "Adicionar", preencha o formulário
   - Escolha categoria, quem pagou, entre quem dividir
   - Clique em "Adicionar Despesa"

4. **Ver Histórico**
   - Vá para aba "Lista"
   - Veja todas as despesas
   - Toque no ícone de lixeira para deletar

5. **Ver Saldo**
   - Vá para aba "Saldo"
   - Veja quanto cada pessoa deve/recebe
   - Veja sugestões de pagamento otimizadas

6. **Ver Gráficos**
   - Vá para aba "Gráficos"
   - Visualize distribuição de gastos
   - Veja estatísticas detalhadas

## ⚠️ Notas Importantes

- **OCR**: O reconhecimento de texto funciona melhor com recibos bem iluminados e legíveis
- **Permissões**: O app precisa de permissão para acessar a câmera
- **Dados**: Todos os dados são salvos localmente no dispositivo
- **Performance**: O OCR pode demorar alguns segundos para processar imagens grandes

## 🐛 Troubleshooting

### Erro ao instalar dependências
```bash
npm install --legacy-peer-deps
```

### Erro de permissão da câmera
- Verifique as configurações do celular
- Permita acesso à câmera para o Expo Go

### OCR não funciona
- Tente com imagem mais nítida
- Use inserção manual se necessário
- Verifique se a imagem tem texto legível

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ usando React Native + Expo

---

**Pronto para usar!** 🚀

Execute `npx expo start` e comece a gerenciar suas finanças!
