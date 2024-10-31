import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router, useRouter } from 'expo-router';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './StartPage';
import OnboardingScreen from './OnboardingScreen';
import { useEffect, useState } from 'react';
import { clearAsyncStorage, getItem } from './utils/asyncStorage';

const Stack = createNativeStackNavigator();

export default function App() {

  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(()=>{
    checkIfAlreadyOnboarded();
    clearAsyncStorage();
  })

  const checkIfAlreadyOnboarded = async ()=>{
    let onboarded = await getItem('onboarded');
    if(onboarded==1){
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  }

  if(showOnboarding==null){
    return null;
  }

  if(showOnboarding){
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='Onboarding'>
          <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
          <Stack.Screen name="StartPage" options={{headerShown: false}} component={StartPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='StartPage'>
          <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
          <Stack.Screen name="StartPage" options={{headerShown: false}} component={StartPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}