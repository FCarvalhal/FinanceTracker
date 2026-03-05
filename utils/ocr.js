import Tesseract from 'tesseract.js';

/**
 * Processa uma imagem e extrai o valor da despesa usando OCR
 * @param {string} imageUri - URI da imagem a ser processada
 * @returns {Promise<{value: number, rawText: string}>} - Valor extraído e texto completo
 */
export const extractValueFromImage = async (imageUri) => {
  try {
    // Executa OCR na imagem
    const { data: { text } } = await Tesseract.recognize(
      imageUri,
      'por', // Português
      {
        logger: (m) => console.log(m), // Log do progresso
      }
    );

    console.log('Texto OCR extraído:', text);

    // Procura por valores monetários no texto
    // Padrões: R$ 10,50 | 10,50 | 10.50 | R$10,50
    const moneyPattern = /R?\$?\s?(\d{1,}[.,]\d{2})/g;
    const matches = text.match(moneyPattern);

    if (matches && matches.length > 0) {
      // Pega o maior valor encontrado (geralmente é o total)
      const values = matches.map(match => {
        const cleaned = match.replace(/R?\$?\s?/g, '').replace(',', '.');
        return parseFloat(cleaned);
      });

      const maxValue = Math.max(...values);
      
      return {
        value: maxValue,
        rawText: text,
        success: true
      };
    }

    // Se não encontrar padrões monetários, retorna erro
    return {
      value: 0,
      rawText: text,
      success: false,
      error: 'Nenhum valor monetário encontrado'
    };

  } catch (error) {
    console.error('Erro ao processar OCR:', error);
    return {
      value: 0,
      rawText: '',
      success: false,
      error: error.message
    };
  }
};

/**
 * Valida e formata um valor monetário
 * @param {string} value - Valor a ser formatado
 * @returns {number} - Valor numérico formatado
 */
export const formatMoneyValue = (value) => {
  if (typeof value === 'number') return value;
  
  const cleaned = value.replace(/[^0-9.,]/g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
};

/**
 * Formata número para exibição em real brasileiro
 * @param {number} value - Valor numérico
 * @returns {string} - Valor formatado (ex: "R$ 10,50")
 */
export const formatCurrency = (value) => {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};
