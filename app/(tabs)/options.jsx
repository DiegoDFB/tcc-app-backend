import { Text, View, Image, ScrollView, TouchableOpacity, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { icons } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Options = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {

  }, []);

  const handleDarkModeToggle = async () => {
    setDarkMode(!darkMode);
  };

  const handleNotificationsToggle = async () => {
    setNotifications(!notifications);
  };

  return (
    <SafeAreaView style={{ backgroundColor: darkMode ? '#333' : '#fff' }} className="h-full">
      <ScrollView>
        <View className="w-full h-[100vh] bg-fifth" style={{ backgroundColor: darkMode ? '#444' : '#fff' }}>
          <View className="w-full h-[100px] items-center justify-center">
            <Text className="text-3xl font-pbold" style={{ color: darkMode ? '#fff' : '#333' }}>Opções</Text>
          </View>
          <View className="w-full h-[100px] absolute items-start justify-center ml-5">
            <TouchableOpacity 
              onPress={ () =>
                {
                  router.push({
                    pathname:"/home"});
                }
               } 
              className="w-[30px] h-[30px]"
            >
              <Image 
                source={icons.leftArrow}
                className="w-full h-full"
                resizeMode="contain"
                style={{ tintColor: darkMode ? '#fff' : '#333' }}
              />
            </TouchableOpacity>
          </View>

          <View className="w-full items-center -mt-3">
            <View className="bg-white h-[70px] rounded-xl w-[95vw] mb-5 flex-row justify-between items-center" style={{ backgroundColor: darkMode ? '#444' : '#fff' }}>
              <Text className="text-lg font-pbold" style={{ color: darkMode ? '#fff' : '#333' }}>Modo Escuro</Text>
              <Switch value={darkMode} onValueChange={handleDarkModeToggle} trackColor={{ true: '#333', false: '#fff' }} thumbColor={darkMode ? '#fff' : '#333'} />
            </View>

            <View className="bg-white h-[70px] rounded-xl w-[95vw] mb-5 flex-row justify-between items-center" style={{ backgroundColor: darkMode ? '#444' : '#fff' }}>
              <Text className="text-lg font-pbold" style={{ color: darkMode ? '#fff' : '#333' }}>Notificações</Text>
              <Switch value={notifications} onValueChange={handleNotificationsToggle} trackColor={{ true: '#333', false: '#fff' }} thumbColor={darkMode ? '#fff' : '#333'} />
            </View>

            <TouchableOpacity 
              onPress={() => console.log('Clear Cache pressed')} 
              className="bg-white h-[70px] rounded-xl w-[95vw] mb-5" style={{ backgroundColor: darkMode ? '#444' : '#fff' }}
            >
              <Text className="text-lg font-pbold" style={{ color: darkMode ? '#fff' : '#333' }}>Limpar Cache</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => console.log('Terms and Conditions pressed')} 
              className="bg-white h-[70px] rounded-xl w-[95vw] mb-5" style={{ backgroundColor: darkMode ? '#444' : '#fff' }}
            >
              <Text className="text-lg font-pbold" style={{ color: darkMode ? '#fff' : '#333' }}>Termos e Condições</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => console.log('About pressed')} 
              className="bg-white h-[70px] rounded-xl w-[95vw] mb-5" style={{ backgroundColor: darkMode ? '#444' : '#fff' }}
            >
              <Text className="text-lg font-pbold" style={{ color: darkMode ? '#fff' : '#333' }}>Sobre</Text>
            </TouchableOpacity>
          </ View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor={darkMode ? '#333' : '#FF8229'} style={darkMode ? 'light' : 'dark'} />
    </SafeAreaView>
  );
};

export default Options;