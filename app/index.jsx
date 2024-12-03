import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './OnboardingScreen';
import { useEffect, useState } from 'react';
import { clearAsyncStorage, getItem } from './utils/asyncStorage';
import SignIn from './(auth)/sign-in';

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
          <Stack.Screen name="Login" options={{headerShown: false}} component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Onboarding" options={{headerShown: false}} component={OnboardingScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}