import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { Client } from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Brinquedo = () => {
  const [modalVisible, setModalVisible] = useState(true); // Modal visível enquanto não conecta
  const [statusConexao, setStatusConexao] = useState('Desconectado'); // Estado para conexão
  const slideAnim = useRef(new Animated.Value(0)).current; // Animação de slide começando visível (0)

  const processarMensagem = (message) => {
    // Obtém a data atual no formato 'YYYY-MM-DD'
    const dataAtual = new Date().toISOString().split('T')[0]; 
  
    return message
      .split(';')
      .map((entry) => {
        const fields = entry.split(',');
        const obj = {};
        fields.forEach((field) => {
          const [key, value] = field.split(':').map((item) => item.trim());
          obj[key] = isNaN(value) ? value : Number(value);
        });
  
        // Adiciona a data atual ao objeto
        obj.date = dataAtual;
  
        return obj;
      })
      .filter((item) => Object.keys(item).length > 0);
  };

  const salvarNoAsyncStorage = async (dados) => {
    try {
      // Recupera os dados existentes
      const dadosExistentes = await AsyncStorage.getItem('@dados_quiz');

      // Se houver dados existentes, parse-os, senão use um array vazio
      const dadosAtuais = dadosExistentes ? JSON.parse(dadosExistentes) : [];

      // Adiciona os novos dados aos dados existentes
      const dadosAtualizados = [...dadosAtuais, ...dados];

      // Salva os dados atualizados no AsyncStorage
      await AsyncStorage.setItem('@dados_quiz', JSON.stringify(dadosAtualizados));
      console.log('Dados salvos no AsyncStorage:', dadosAtualizados);
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // Cria uma instância do cliente MQTT
    const client = new Client('ws://test.mosquitto.org:8080/mqtt', 'clientId' + new Date().getTime());

    // Configura o callback de perda de conexão
    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log('Conexão perdida:', responseObject.errorMessage);
        setStatusConexao('Desconectado'); // Atualiza status para "Desconectado"
      }
    };

    // Configura o callback de mensagem recebida
    client.onMessageArrived = (message) => {
      // Verifica se a mensagem indica que o ESP32 se conectou ou desconectou
      if (message.payloadString.includes('ESP32 Conectado')) {
        setStatusConexao('Conectado'); // Atualiza para "Conectado"
      } else if (message.payloadString.includes('ESP32 Desconectado')) {
        setStatusConexao('Desconectado'); // Atualiza para "Desconectado"
      } else {
        console.log('Mensagem recebida:', message.payloadString);
        const msgProcessada = processarMensagem(message.payloadString);
        console.log(msgProcessada);
        Alert.alert('Aviso', 'Dados recebidos!');
        salvarNoAsyncStorage(msgProcessada);
      }
    };

    // Conecta ao broker MQTT
    client.connect({
      onSuccess: () => {
        console.log('Conectado ao broker MQTT!');
        // Chama a animação de slide para esconder o modal
        Animated.timing(slideAnim, {
          toValue: 600, // Move o modal para fora da tela
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setModalVisible(false); // Depois que a animação terminar, esconde o modal
        });
        client.subscribe('/fellowfox'); // Inscreve-se no tópico
        client.subscribe('fellowfox/status'); // Inscreve-se no tópico
      },
      useSSL: false,
      onFailure: (e) => {
        console.log('Erro ao conectar:', JSON.stringify(e));
      },
    });

    // Limpeza na desmontagem do componente
    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  return (
    <View style={styles.container}>

      {modalVisible && (
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.modalTitle}>Aguardando Conexão</Text>
            <Text style={styles.modalMessage}>
              O aplicativo está se conectando a rede. Aguarde...
            </Text>
          </Animated.View>
        </View>
      )}

      {!modalVisible && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Conexão do Brinquedo: <Text style={statusConexao === 'Conectado' ? styles.connected : styles.disconnected}>{statusConexao}</Text>
          </Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  statusContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  connected: {
    color: 'green',
  },
  disconnected: {
    color: 'red',
  },
});

export default Brinquedo;
