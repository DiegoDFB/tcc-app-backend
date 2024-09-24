import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-toast-message';

const Home = () => {

  useEffect(() => {
    showToast();
  })

  const { nome } = useLocalSearchParams();
  const estadoConexao = false;

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Login feito com sucesso',
      text2: 'Seja bem-vindo! 👋'
    });
  }

  return <RootSiblingParent>
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
          <Image 
              source={images.bghome1}
              className="w-[150vw] h-[80vh] -mt-14 -ml-10 absolute overflow-hidden"
              resizeMode="cover"
            />

            <Text
            className="text-3xl font-bold text-white mt-10 pl-2 ml-10 text-left bg-third rounded-xl w-[80vw]"
            >Bem-vindo, {nome}!
            </Text>

          <View className="w-full items-center min-h-[85vh] px-4">

          <View className="w-[80vw] h-[30vh] mt-5 mb-10
            justify-start flex-row bg-fifth rounded-2xl">
              {estadoConexao ? 
                <View className="w-[39vw] justify-center">
                  <Image 
                    source={images.foxHappy}
                    className="w-[50vw] -ml-7 absolute"
                    resizeMode="contain"
                  />
                </View>
              : <View className="w-[39vw] justify-center">
                  <Image 
                    source={images.foxHappy}
                    className="w-[50vw] -ml-7 absolute"
                    resizeMode="contain"
                  />
                </View>}
              {estadoConexao ? 
                <View className="w-[39vw] pl-1 bg-third rounded-xl h-[20vh] mt-10 justify-center">
                  <Text
                  className="text-3xl font-bold text-white text-center"
                  >Sucesso!
                  </Text>
                  <Text
                  className="text-xl font-bold text-white text-left mt-5 mr-3 pl-1"
                  >Seu brinquedo está conectado!
                  </Text>
                </View> :
                    <View className="w-[39vw] pl-1 bg-third rounded-xl h-[22vh] mt-10">
                      <Text
                      className="text-xl font-bold text-white text-left pl-1"
                      >Parece que você ainda não conectou seu brinquedo!
                      </Text>
                      <View>
                        <CustomButton 
                          title="Conectar"
                          handlePress={() => router.push('/sign-in')}
                          containerStyles="w-[35vw] mt-2 border-2 border-third rounded-3xl bg-white"
                          textStyles="text-third"
                        />
                      </View>
                    </View>
                  }
            </View>

            <View className="w-full h-[100px] mt-10
            justify-around flex-row">
              <View className="w-[100px] h-[140px]
              items-center flex-column">
                <TouchableOpacity 
                  onPress={ () => router.push('/sign-in') }
                  className="w-[100px] h-[100px] rounded-xl
                  justify-center flex-row bg-lightgreen items-center"
                >
                  <Image 
                    source={icons.pencil}
                    className="w-[80%] h-[80%]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Progresso</Text>
              </View>

              <View className="w-[100px] h-[140px]
              items-center flex-column">
                <TouchableOpacity 
                  onPress={ () => router.push('/sign-in') }
                  className="w-[100px] h-[100px] rounded-xl
                  justify-center flex-row bg-lightblue items-center"
                >
                  <Image 
                    source={icons.notebook}
                    className="w-[80%] h-[80%]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Aprender</Text>
              </View>

              <View className="w-[100px] h-[140px]
              items-center flex-column">
                <TouchableOpacity 
                  onPress={ () => router.push('/sign-in') }
                  className="w-[100px] h-[100px] rounded-xl
                  justify-center flex-row bg-lightyellow items-center"
                >
                  <Image 
                    source={icons.interrogation}
                    className="w-[80%] h-[80%] ml-1"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text className="text-xl font-bold">Ajuda</Text>
              </View>
              
            </View>

          </View>
        </ScrollView>

        <StatusBar backgroundColor='#FF8229' 
        style='light' />
      </SafeAreaView>
      <Toast visible={true} >Hello !</Toast>
    </RootSiblingParent>
}

export default Home