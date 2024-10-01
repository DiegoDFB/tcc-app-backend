import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, Dimensions, TextInput } from 'react-native';
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
import Svg, { Circle } from 'react-native-svg';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';


const radius = 45;
const circunference = radius * Math.PI * 2;
const duration = 6000;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);


const Home = () => {

  useEffect(() => {
    showToast();
    strokeOffset.value = 0;
  }, []);


  const { nome } = useLocalSearchParams();
  const estadoConexao = false;

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Login feito com sucesso',
      text2: 'Seja bem-vindo! 👋'
    });
  }

  const strokeOffset = useSharedValue(circunference);

  const percentage = useDerivedValue(() => {
    const number = ((circunference - strokeOffset.value) / circunference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: "#9E4784",
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)} %`
    }
  });

  return <RootSiblingParent>
      <SafeAreaView className="bg-white h-full">
        <ScrollView>
            <Text
            className="text-3xl font-bold text-white mt-10 pl-2 ml-5 text-left bg-third rounded-xl w-[90vw]"
            >Bem-vindo, {nome}!
            </Text>

          <View className="w-full items-center min-h-[85vh] px-4">

          <View className="w-[90vw] h-[30vh] mt-5
            justify-around flex-row bg-fifth rounded-2xl">
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
                <View className="w-[39vw] pl-1 rounded-xl h-[20vh] mt-10 justify-center">
                  <Text
                  className="text-3xl font-bold text-center"
                  >Sucesso!
                  </Text>
                  <Text
                  className="text-xl font-bold text-left mt-5 mr-3 pl-1"
                  >Seu brinquedo está conectado!
                  </Text>
                </View> :
                    <View className="w-[39vw] pl-1 rounded-xl h-[22vh] mt-10 items-center">
                      <Text
                      className="text-xl font-bold text-left pl-1"
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

            <View className="w-full h-[300px] mt-5
            justify-around flex-row bg-fifth rounded-3xl">
              <View className="w-[100px] h-[140px]
              items-center flex-column mt-5">
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
              items-center flex-column mt-5">
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
              items-center flex-column mt-5">
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

            <View className="w-full h-[500px] mt-5
            justify-around bg-fifth rounded-3xl items-center">
                  <AnimatedText className="text-white font-3xl font-pbold absolute mt-10"
                  animatedProps={animatedTextProps}>

                  </AnimatedText>
                  
                  <Svg 
                  height="50%"
                  width="50%"
                  viewBox="0 0 100 100"
                  >
                    <Circle 
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#E7E7E7"
                    fill="transparent"
                    strokeWidth={10} />

                    <AnimatedCircle
                    animatedProps={animatedCircleProps}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    strokeWidth={10}
                    strokeDasharray={`${radius * Math.PI * 2}`}
                    strokeLinecap={'round'} />
                  </Svg>
              
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