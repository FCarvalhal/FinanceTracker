import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { extractValueFromImage } from '../utils/ocr';

/**
 * Componente para capturar foto de recibo e extrair valor via OCR
 * @param {Function} onValueExtracted - Callback com o valor extraído
 */
const CameraInput = ({ onValueExtracted }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  // Verifica se tem permissão de câmera
  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Carregando câmera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Precisamos de permissão para usar a câmera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Conceder Permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Captura foto com a câmera
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        
        setCapturedImage(photo.uri);
        setShowCamera(false);
        await processImage(photo.uri);
      } catch (error) {
        console.error('Erro ao tirar foto:', error);
        Alert.alert('Erro', 'Não foi possível tirar a foto');
      }
    }
  };

  // Seleciona uma imagem da galeria
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setCapturedImage(result.assets[0].uri);
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem');
    }
  };

  // Processa a imagem com OCR
  const processImage = async (imageUri) => {
    setProcessing(true);
    
    try {
      const result = await extractValueFromImage(imageUri);
      
      if (result.success && result.value > 0) {
        Alert.alert(
          'Valor Detectado',
          `Valor encontrado: R$ ${result.value.toFixed(2)}`,
          [
            {
              text: 'Usar este valor',
              onPress: () => {
                onValueExtracted(result.value, imageUri);
                setCapturedImage(null);
              }
            },
            {
              text: 'Tentar novamente',
              onPress: () => setCapturedImage(null),
              style: 'cancel'
            }
          ]
        );
      } else {
        Alert.alert(
          'OCR Falhou',
          'Não foi possível detectar o valor. Você pode inserir manualmente.',
          [
            {
              text: 'OK',
              onPress: () => {
                onValueExtracted(0, imageUri);
                setCapturedImage(null);
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Erro no OCR:', error);
      Alert.alert(
        'Erro',
        'Erro ao processar a imagem. Insira o valor manualmente.'
      );
      onValueExtracted(0, imageUri);
      setCapturedImage(null);
    } finally {
      setProcessing(false);
    }
  };

  // Se está mostrando a câmera
  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          ref={cameraRef}
          facing="back"
        >
          <View style={styles.cameraOverlay}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <View style={styles.captureContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  // Tela inicial com opções
  return (
    <View style={styles.container}>
      {processing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.processingText}>
            Processando imagem com OCR...
          </Text>
        </View>
      ) : capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, styles.cameraButton]}
            onPress={() => setShowCamera(true)}
          >
            <Text style={styles.buttonIcon}>📷</Text>
            <Text style={styles.buttonText}>Tirar Foto do Recibo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.galleryButton]}
            onPress={pickImage}
          >
            <Text style={styles.buttonIcon}>🖼️</Text>
            <Text style={styles.buttonText}>Escolher da Galeria</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  permissionContainer: {
    padding: 20,
    alignItems: 'center',
    gap: 15,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  cameraButton: {
    backgroundColor: '#2196F3',
  },
  galleryButton: {
    backgroundColor: '#FF9800',
  },
  buttonIcon: {
    fontSize: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
  },
  processingContainer: {
    alignItems: 'center',
    padding: 30,
    gap: 15,
  },
  processingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  previewContainer: {
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});

export default CameraInput;
