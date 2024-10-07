import { Text, View, Image } from 'react-native'
import { Tabs } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FF8229',
        tabBarInactiveTintColor: '#A0A0AD',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopColor: '#FFF',
          height: 84,
        }
      }}>
        <Tabs.Screen 
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.home}
              color={color}
              name="Início"
              focused={focused}
            />
          )
        }}
        />
        <Tabs.Screen 
        name="notifications"
        options={{
          title: 'Notifications',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.notifications}
              color={color}
              name="Notificações"
              focused={focused}
            />
          )
        }}
        />
        <Tabs.Screen 
        name="options"
        options={{
          title: 'Options',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.config}
              color={color}
              name="Opções"
              focused={focused}
            />
          )
        }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout