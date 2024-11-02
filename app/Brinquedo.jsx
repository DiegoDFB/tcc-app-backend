import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Client } from 'paho-mqtt';

const Brinquedo = () => {
  const [resultados, setResultados] = useState([]);

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
      processMessage(message.payloadString); // Processa a mensagem recebida
    };

    // Conecta ao broker MQTT
    client.connect({
      onSuccess: () => {
        console.log('Conectado ao broker MQTT!');
        client.subscribe('seu_topico'); // Inscreve-se no tópico
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

  const processMessage = (message) => {
    console.log('Processando a mensagem:', message); // Log da mensagem recebida

    // Obtém a data atual do dispositivo
    const currentDate = new Date(); // Data e hora atuais

    // Divide a mensagem em linhas
    const lines = message.split('\n').filter(line => line.trim() !== ''); // Remove linhas vazias
    const resultadosProcessados = lines.map(line => {
      const parts = line.split(' - ');

      // Verifica se a linha contém todas as partes necessárias
      if (parts.length === 2) {
        const tipo = parts[0].trim(); // Tipo da operação
        const resultados = parts[1].split(',').map(part => part.trim()); // Separar acertos e erros
        const acertos = resultados[0]; // Primeiro valor é acertos
        const erros = resultados[1]; // Segundo valor é erros
        
        // Formata a data atual para exibição
        const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

        return {
          tipo,
          acertos,
          erros,
          data: formattedDate, // Inclui a data atual formatada
        };
      } else {
        // Retorna um objeto vazio caso a linha não esteja no formato esperado
        return {};
      }
    }).filter(result => Object.keys(result).length > 0); // Remove resultados vazios

    console.log('Resultados processados:', resultadosProcessados); // Log dos resultados processados
    setResultados(resultadosProcessados);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.tipo}: {item.acertos} acertos, {item.erros} erros, Data: {item.data}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Resultados do Quiz:</Text>
      <FlatList
        data={resultados}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});

export default Brinquedo;
