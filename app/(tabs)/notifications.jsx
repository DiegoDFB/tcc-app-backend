import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, Button } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../../constants';
import CustomButton from '../../components/CustomButton';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

let notifications = [];

const storeNotifications = async (notifications) => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error storing notifications:', error);
    throw error;
  }
};

const getNotifications = async () => {
  try {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  } catch (error) {
    console.error('Error retrieving notifications:', error);
    throw error;
  }
};

const addNotification = async (notification) => {
  if (!notification.id || !notification.title || !notification.message) {
    throw new Error('Invalid notification data');
  }

  const notifications = await getNotifications();
  notifications.push(notification);
  await storeNotifications(notifications);
};

const removeNotification = async (notificationId) => {
  const notifications = await getNotifications();
  const index = notifications.findIndex((notification) => notification.id === notificationId);
  if (index !== -1) {
    notifications.splice(index, 1);
    await storeNotifications(notifications);
  }
};

const updateNotification = async (notificationId, updatedNotification) => {
  if (!updatedNotification.id || !updatedNotification.title || !updatedNotification.message) {
    throw new Error('Invalid notification data');
  }

  const notifications = await getNotifications();
  const index = notifications.findIndex((notification) => notification.id === notificationId);
  if (index !== -1) {
    notifications[index] = updatedNotification;
    await storeNotifications(notifications);
  }
};


const Home = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const storedNotifications = await getNotifications();
      setNotifications(storedNotifications);
    };
    fetchNotifications();
  }, []);

  const handleClearNotifications = async () => {
    await clearNotifications();
  };

  const clearNotifications = async () => {
    try {
      await AsyncStorage.removeItem('notifications');
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const handleAddNotification = async () => {
    const newNotification = {
      id: 'notif-1',
      title: 'New Notification 3',
      message: 'This is a new notification 2',
      date: 'Hoje'
    };
    await addNotification(newNotification);
    const updatedNotifications = await getNotifications();
    setNotifications(updatedNotifications);
  };

  const sortedNotifications = notifications.sort((a, b) => {
    if (a.date === 'Hoje') return -1;
    if (b.date === 'Hoje') return 1;
    if (a.date === 'Ontem') return -1;
    if (b.date === 'Ontem') return 1;
    return 0;
  });

  return (
    <SafeAreaView className="bg-white h-full">
      {/* ... other components ... */}
      <View className="w-full items-center -mt-3">
        {sortedNotifications.reduce((acc, notification, index) => {
          if (index === 0 || notification.date !== sortedNotifications[index - 1].date) {
            acc.push(
              <View key={notification.id} className="bg-fifth h-[30px] rounded-3xl w-fit pl-4 pr-4 mb-5 justify-center items-center" style={{ elevation: 10, shadowColor: '#52006A' }}>
                <Text className="text-xl font-pbold">
                  {notification.date}
                </Text>
              </View>
            );
          }
          acc.push(
            <View key={notification.id} className="bg-white h-[100px] rounded-3xl w-[95vw] mb-5" style={{ elevation: 10, shadowColor: '#52006A' }}>
              <Text className="text-lg font-pbold">{notification.title}</Text>
              <Text className="text-sm">{notification.message}</Text>
              <Text className="text-xs">{notification.date}</Text>
            </View>
          );
          return acc;
        }, [])}

        <Text className="font-pbold text-2xl mt-52">Página em Desenvolvimento!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;