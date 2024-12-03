import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Client } from 'paho-mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Brinquedo = () => {

  const processarMensagem = (message) => {
    return message
      .split(';') // Divide a string em partes usando o ponto e vírgula
      .map((entry) => {
        const fields = entry.split(','); // Divide cada entrada nos campos
        const obj = {};
        fields.forEach((field) => {
          const [key, value] = field.split(':').map((item) => item.trim()); // Divide em chave e valor
          obj[key] = isNaN(value) ? value : Number(value); // Converte números
        });
        return obj;
      })
      .filter((item) => Object.keys(item).length > 0); // Remove itens vazios
  };

  const salvarNoAsyncStorage = async (dados) => {
    try {
      await AsyncStorage.setItem('@dados_quiz', JSON.stringify(dados));
      console.log('Dados salvos no AsyncStorage:', dados);
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
      }
    };

    // Configura o callback de mensagem recebida
    client.onMessageArrived = (message) => {
      console.log('Mensagem recebida:', message.payloadString);
      msgProcessada = processarMensagem(message.payloadString);
      console.log(msgProcessada);
      salvarNoAsyncStorage(msgProcessada);
    };

    // Conecta ao broker MQTT
    client.connect({
      onSuccess: () => {
        console.log('Conectado ao broker MQTT!');
        client.subscribe('/fellowfox'); // Inscreve-se no tópico
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
    <View>
      
    </View>
  );
};

export default Brinquedo;