import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'
import CustomButton from '../../components/CustomButton';

const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        
        <Image 
            source={images.bghome1}
            className="w-[150vw] h-[60vh] -mt-14 -ml-10 absolute overflow-hidden"
            resizeMode="contain"
          />

        <View className="w-full items-center min-h-[85vh] px-4">
          <Image 
            source={images.logo}
            className="w-[130px] h-[84px] mt-3"
            resizeMode="contain"
          />

          <Text
          className="text-lg font-bold text-white mt-3 text-center"
          >Você ainda não conectou um boneco
          </Text>

          <CustomButton 
            title="Conectar"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-[60vw] mt-5 mb-10 border-2 border-white rounded-2xl bg-orange-500"
            textStyles="text-white"
          />

          <View className="w-[80vw] h-[30vh] bg-secondary-200 mt-20 rounded-xl border-4
          justify-evenly">
            <Text
            className="text-2xl font-bold text-white text-center"
            >Tempo de Aprendizado
            </Text>
            <Text
            className="text-6xl font-bold text-white mt-5 text-center"
            >3 Horas
            </Text>
            <Text
            className="text-2xl font-bold text-white text-center"
            >na última semana
            </Text>
          </View>

          <View className="w-[80vw] h-[30vh] bg-secondary-200 mt-10 mb-10 rounded-xl border-4
          justify-start flex-row">
            <View className="w-[39vw] justify-center">
              <Text
              className="text-6xl font-bold text-white text-center"
              >20
              </Text>
              <Text
              className="text-2xl font-bold text-white text-center"
              >Questões respondidas
              </Text>
            </View>
            <View className="w-[39vw] justify-center">
              <Text
              className="text-6xl font-bold text-white text-center"
              >75%
              </Text>
              <Text
              className="text-2xl font-bold text-white text-center"
              >Acertos
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>

      <StatusBar backgroundColor='#FF8229' 
      style='light' />
    </SafeAreaView>
  );
}

export default Home