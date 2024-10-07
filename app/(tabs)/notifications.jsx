import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton';
import { TouchableOpacity } from 'react-native';

const Home = () => {

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full h-[100vh] bg-white">
          <View className="w-full h-[100px] items-center justify-center">
            <Text className="text-3xl font-pbold">
              Notificações
            </Text>
          </View>
          <View className="w-full h-[100px] absolute items-start justify-center ml-5">
            <TouchableOpacity 
            onPress={ () => router.push('/sign-in') }
            className="w-[30px] h-[30px]"
            >
              <Image 
              source={icons.leftArrow}
              className="w-full h-full"
              resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full h-[100px] absolute items-end justify-center mr-5">
            <View className="flex-row justify-around w-[80px]">
              <TouchableOpacity 
              onPress={ () => router.push('/sign-in') }
              className="w-[30px] h-[30px]"
              >
                <Image 
                source={icons.config}
                className="w-full h-full"
                resizeMode="contain"
                />
              </TouchableOpacity>

              <TouchableOpacity 
              onPress={ () => router.push('/sign-in') }
              className="w-[30px] h-[30px]"
              >
                <Image 
                source={icons.config}
                className="w-full h-full"
                resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="w-full items-center -mt-3">
            <View className="bg-fifth h-[30px] rounded-3xl w-[30vw] mb-5 justify-center items-center"
            style={{
              elevation: 10,
              shadowColor: '#52006A'
            }}>
              <Text className="text-xl font-pbold">
                Hoje
              </Text>
            </View>

            <View className="bg-white h-[100px] rounded-3xl w-[95vw] mb-5"
            style={{
              elevation: 10,
              shadowColor: '#52006A'
            }}>

            </View>

            <View className="bg-white h-[100px] rounded-3xl w-[95vw] mb-5"
            style={{
              elevation: 10,
              shadowColor: '#52006A'
            }}>

            </View>

            <View className="bg-white h-[100px] rounded-3xl w-[95vw] mb-5"
            style={{
              elevation: 10,
              shadowColor: '#52006A'
            }}>
              

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