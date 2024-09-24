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

export default function App(props) {

  const router = useRouter();

  return (
    <>
    <SafeAreaView className="bg-third h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <LinearGradient
          colors={['rgba(250,198,142,1)', 'rgba(240,129,48,1)']}
          className="w-full h-full absolute"
        />

        <Image 
            source={images.homeScreen}
            className="w-[100vw] h-[400px] mt-8"
            resizeMode="cover"
          />
        <LinearGradient 
        colors={['rgba(240,129,48,1)', 'rgba(250,198,142,1)']}
        className="w-full -mt-5 align-bottom items-center min-h-[85vh] px-4 rounded-xl border-2 border-white">
          

          <View className="relative mt-2">
            <Text className="text-3xl text-white font-bold text-center">
              Aprendizado e diversão com {''}
              <Text className="text-fourth">Fellow Fox</Text>
            </Text>

          </View>

          <Text
          className="text-xl font-bold text-white mt-2 text-center"
          >Estimule o aprendizado da matemática com lições lúdicas e divertidas.
          </Text>

          <CustomButton 
            title="Entrar com Email"
            handlePress={() => {
              if (router) {
                router.push('/sign-in');
              } else {
                console.error("Router object is null");
              }
            }}
            containerStyles="w-[60vw] mt-5 bg-white"
            textStyles="text-third"
          />
        </LinearGradient>
      </ScrollView>

      <StatusBar hidden />
    </SafeAreaView>
    <Toast />
    </>
  );
}
