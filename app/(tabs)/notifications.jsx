import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton';

const Home = () => {

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        
      </ScrollView>

      <StatusBar backgroundColor='#FF8229' 
      style='light' />
    </SafeAreaView>
  );
}

export default Home