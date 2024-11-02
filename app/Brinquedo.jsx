import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Client, Message } from 'paho-mqtt';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Brinquedo = () => {
  const [valor, setValor] = useState(null);

  useEffect(() => {
    // Create a client instance
    const client = new Client('ws://test.mosquitto.org:8080/mqtt', 'clientId' + new Date().getTime());

    // Set up the connection lost callback
    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log('Conexão perdida:', responseObject.errorMessage);
      }
    };

    // Set up the message arrived callback
    client.onMessageArrived = (message) => {
      console.log('Mensagem recebida:', message.payloadString);
      setValor(message.payloadString);
    };

    // Connect to the MQTT broker
    client.connect({
      onSuccess: () => {
        console.log('Conectado ao broker MQTT!');
        client.subscribe('seu_topico'); // Subscribe to your topic
      },
      useSSL: false,  // Ensure SSL is set to false
      onFailure: (e) => {
        console.log('Erro ao conectar:', JSON.stringify(e));
      },
      // Remove userName and password if not needed for authentication
      userName: '', // Use empty string if not needed
      password: '', // Use empty string if not needed
    });

    // Clean up on component unmount
    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, []);

  return (
    <View>
      <Text>Valor recebido do ESP32: {valor}</Text>
    </View>
  );
};

export default Brinquedo;