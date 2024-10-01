import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, Dimensions } from 'react-native';
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
import AnimateableText from 'react-native-animateable-text';

const BACKGROUND_COLOR = "#00FF00";
const BACKGROUND_STROKE_COLOR = "#FF0000";
const STROKE_COLOR = "#0000FF";

const {
  width, height
} = Dimensions.get('window')

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2*Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);


const Home = () => {

  const progress = useSharedValue(0);

  useEffect(() => {
    showToast();
    progress.value = withTiming(1, {duration: 2000})
  }, [])

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`
  })

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
    text: progressText.value,
  }))


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
            justify-around flex-row bg-fifth rounded-3xl items-center">
                  <AnimateableText className="font-lg text-white" animatedProps={progressText}/>
                  
                  <Svg className="absolute">
                    <Circle cx={width / 2} cy={height / 2} r={R} stroke={BACKGROUND_STROKE_COLOR} strokeWidth={30} />
                    <AnimatedCircle cx={width / 2} cy={height / 2} r={R} stroke={STROKE_COLOR} strokeWidth={15} 
                    strokeDasharray={CIRCLE_LENGTH} strokeDashoffset={CIRCLE_LENGTH * 0.5}
                    animatedProps={animatedProps} strokeLinecap={'round'}/>
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