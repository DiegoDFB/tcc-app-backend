import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Options = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(600)).current; // Ajuste para começar mais abaixo da tela

  const openModal = () => {
    setModalVisible(true); // Torna o modal visível
    Animated.timing(slideAnim, {
      toValue: 0, // Move o conteúdo para a posição visível
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 600, // Move o conteúdo para fora da tela (600px abaixo)
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false)); // Fecha o modal após a animação
  };

  const clearStatisticsData = async () => {
    try {
      await AsyncStorage.removeItem('@dados_quiz');
      closeModal();
      alert('Os dados de estatísticas foram limpos com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar os dados de estatísticas:', error);
      closeModal();
      alert('Não foi possível limpar os dados de estatísticas.');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#f5f5f5' }} className="h-full">
      <ScrollView>
        <View className="w-full h-[100vh] bg-fifth" style={{ backgroundColor: '#f5f5f5' }}>
          {/* Header */}
          <View className="w-full h-[100px] items-center justify-center">
            <Text className="text-3xl font-pbold" style={{ color: '#333' }}>Opções</Text>
          </View>
          {/* Back Button */}
          <View className="w-full h-[100px] absolute items-start justify-center ml-5">
            <TouchableOpacity
              onPress={() => {
                router.push({ pathname: '/home' });
              }}
              className="w-[30px] h-[30px]"
            >
              <Image
                source={icons.leftArrow}
                className="w-full h-full"
                resizeMode="contain"
                style={{ tintColor: '#333' }}
              />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <View className="w-full items-center -mt-3">
            <TouchableOpacity
              onPress={openModal}
              className="bg-white h-[70px] rounded-xl w-[95vw] mb-5"
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' }}
            >
              <Text className="text-lg font-pbold" style={{ color: '#333', textAlign: 'center', lineHeight: 70 }}>
                Limpar Dados de Estatísticas
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log('Terms and Conditions pressed')}
              className="bg-white h-[70px] rounded-xl w-[95vw] mb-5"
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' }}
            >
              <Text className="text-lg font-pbold" style={{ color: '#333', textAlign: 'center', lineHeight: 70 }}>
                Termos e Condições
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log('About pressed')}
              className="bg-white h-[70px] rounded-xl w-[95vw] mb-5"
              style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc' }}
            >
              <Text className="text-lg font-pbold" style={{ color: '#333', textAlign: 'center', lineHeight: 70 }}>
                Sobre
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Custom Modal */}
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.modalTitle}>Confirmação</Text>
            <Text style={styles.modalMessage}>
              Tem certeza de que deseja limpar os dados de estatísticas?
            </Text>
            <Text style={styles.modalAlert}>
              Esta ação não pode ser desfeita.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={clearStatisticsData}
              >
                <Text style={styles.confirmButtonText}>Limpar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      <StatusBar backgroundColor={'#FF8229'} style={'light'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalAlert: {
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    padding: 10,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Options;
